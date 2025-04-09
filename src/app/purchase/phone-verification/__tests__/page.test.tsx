import { usePurchaseStore } from '@/lib/store/purchaseStore';
import { fireEvent, render, screen } from '@testing-library/react';
import PhoneVerificationPage from '../page';

// Mock the purchase store
const mockSetPhone = jest.fn();
const mockSetVerificationCode = jest.fn();
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

describe('PhoneVerificationPage', () => {
  beforeEach(() => {
    // Reset mocks
    mockSetPhone.mockClear();
    mockSetVerificationCode.mockClear();
    mockSetErrors.mockClear();
    mockSetStep.mockClear();
    mockPush.mockClear();
    mockValidateCurrentStep.mockClear();

    // Setup mock store
    (usePurchaseStore as jest.Mock).mockReturnValue({
      phone: '',
      verificationCode: '',
      errors: {},
      setPhone: mockSetPhone,
      setVerificationCode: mockSetVerificationCode,
      setErrors: mockSetErrors,
      setStep: mockSetStep,
      validateCurrentStep: mockValidateCurrentStep
    });
  });

  it('renders the phone verification form', () => {
    render(<PhoneVerificationPage />);

    expect(screen.getByText('Phone Number')).toBeInTheDocument();
    expect(screen.getByText('Verification Code')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your phone number')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter verification code')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  it('updates phone number when input changes', () => {
    render(<PhoneVerificationPage />);

    const phoneInput = screen.getByPlaceholderText('Enter your phone number');
    fireEvent.change(phoneInput, { target: { value: '1234567890' } });

    expect(mockSetPhone).toHaveBeenCalledWith('1234567890');
    expect(mockSetErrors).toHaveBeenCalledWith({ phone: '' });
  });

  it('updates verification code when input changes', () => {
    render(<PhoneVerificationPage />);

    const codeInput = screen.getByPlaceholderText('Enter verification code');
    fireEvent.change(codeInput, { target: { value: '123456' } });

    expect(mockSetVerificationCode).toHaveBeenCalledWith('123456');
    expect(mockSetErrors).toHaveBeenCalledWith({ verificationCode: '' });
  });

  it('validates form and navigates to next step on successful submission', () => {
    render(<PhoneVerificationPage />);

    const form = screen.getByRole('form');
    fireEvent.submit(form);

    expect(mockValidateCurrentStep).toHaveBeenCalled();
    expect(mockSetStep).toHaveBeenCalledWith(2);
    expect(mockPush).toHaveBeenCalledWith('/purchase/identity-verification');
  });

  it('does not navigate if validation fails', () => {
    mockValidateCurrentStep.mockReturnValueOnce(false);
    render(<PhoneVerificationPage />);

    const form = screen.getByRole('form');
    fireEvent.submit(form);

    expect(mockValidateCurrentStep).toHaveBeenCalled();
    expect(mockSetStep).not.toHaveBeenCalled();
    expect(mockPush).not.toHaveBeenCalled();
  });
});