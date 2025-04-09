import { usePurchaseStore } from '@/lib/store/purchaseStore';
import { fireEvent, render, screen } from '@testing-library/react';
import IdentityVerificationPage from '../page';

// Mock the purchase store
const mockSetFullName = jest.fn();
const mockSetEmail = jest.fn();
const mockSetIdentityNumber = jest.fn();
const mockSetErrors = jest.fn();
const mockSetStep = jest.fn();
const mockValidateCurrentStep = jest.fn().mockReturnValue(true);

jest.mock('@/lib/store/purchaseStore', () => ({
  usePurchaseStore: jest.fn()
}));

// Mock Next.js router
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('IdentityVerificationPage', () => {
  beforeEach(() => {
    // Reset mocks
    mockSetFullName.mockClear();
    mockSetEmail.mockClear();
    mockSetIdentityNumber.mockClear();
    mockSetErrors.mockClear();
    mockSetStep.mockClear();
    mockPush.mockClear();
    mockValidateCurrentStep.mockClear();

    // Setup mock store
    (usePurchaseStore as jest.Mock).mockReturnValue({
      fullName: '',
      email: '',
      identityNumber: '',
      errors: {},
      setFullName: mockSetFullName,
      setEmail: mockSetEmail,
      setIdentityNumber: mockSetIdentityNumber,
      setErrors: mockSetErrors,
      setStep: mockSetStep,
      validateCurrentStep: mockValidateCurrentStep
    });
  });

  it('renders the identity verification form', () => {
    render(<IdentityVerificationPage />);

    expect(screen.getByText('Full Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Identity Number')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your full name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your email address')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your identity number')).toBeInTheDocument();
  });

  it('updates full name when input changes', () => {
    render(<IdentityVerificationPage />);

    const nameInput = screen.getByPlaceholderText('Enter your full name');
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });

    expect(mockSetFullName).toHaveBeenCalledWith('John Doe');
    expect(mockSetErrors).toHaveBeenCalledWith({ fullName: '' });
  });

  it('updates email when input changes', () => {
    render(<IdentityVerificationPage />);

    const emailInput = screen.getByPlaceholderText('Enter your email address');
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });

    expect(mockSetEmail).toHaveBeenCalledWith('john@example.com');
    expect(mockSetErrors).toHaveBeenCalledWith({ email: '' });
  });

  it('updates identity number when input changes', () => {
    render(<IdentityVerificationPage />);

    const idInput = screen.getByPlaceholderText('Enter your identity number');
    fireEvent.change(idInput, { target: { value: 'ID12345' } });

    expect(mockSetIdentityNumber).toHaveBeenCalledWith('ID12345');
    expect(mockSetErrors).toHaveBeenCalledWith({ identityNumber: '' });
  });

  it('validates form and navigates to next step on successful submission', () => {
    render(<IdentityVerificationPage />);

    const form = screen.getByRole('form');
    fireEvent.submit(form);

    expect(mockValidateCurrentStep).toHaveBeenCalled();
    expect(mockSetStep).toHaveBeenCalledWith(3);
    expect(mockPush).toHaveBeenCalledWith('/purchase/select-plan');
  });

  it('does not navigate if validation fails', () => {
    mockValidateCurrentStep.mockReturnValueOnce(false);
    render(<IdentityVerificationPage />);

    const form = screen.getByRole('form');
    fireEvent.submit(form);

    expect(mockValidateCurrentStep).toHaveBeenCalled();
    expect(mockSetStep).not.toHaveBeenCalled();
    expect(mockPush).not.toHaveBeenCalled();
  });
});