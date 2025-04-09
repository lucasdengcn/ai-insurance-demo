import { usePurchaseStore } from '@/lib/store/purchaseStore';
import { fireEvent, render, screen } from '@testing-library/react';
import PaymentPage from '../page';

// Mock the purchase store
const mockSetPaymentMethod = jest.fn();
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

describe('PaymentPage', () => {
  beforeEach(() => {
    // Reset mocks
    mockSetPaymentMethod.mockClear();
    mockSetErrors.mockClear();
    mockSetStep.mockClear();
    mockPush.mockClear();
    mockValidateCurrentStep.mockClear();

    // Setup mock store
    (usePurchaseStore as jest.Mock).mockReturnValue({
      selectedPlan: { id: 'basic', price: 99.99 },
      paymentMethod: '',
      errors: {},
      setPaymentMethod: mockSetPaymentMethod,
      setErrors: mockSetErrors,
      setStep: mockSetStep,
      validateCurrentStep: mockValidateCurrentStep
    });
  });

  it('renders the payment form', () => {
    render(<PaymentPage />);

    expect(screen.getByText('Select Payment Method')).toBeInTheDocument();
    expect(screen.getByText('Credit Card')).toBeInTheDocument();
    expect(screen.getByText('Debit Card')).toBeInTheDocument();
    expect(screen.getByText('Bank Transfer')).toBeInTheDocument();
  });

  it('selects a payment method when clicked', () => {
    render(<PaymentPage />);

    const creditCardOption = screen.getByText('Credit Card').closest('div');
    fireEvent.click(creditCardOption);

    expect(mockSetPaymentMethod).toHaveBeenCalledWith('Credit Card');
    expect(mockSetErrors).toHaveBeenCalledWith({ paymentMethod: '' });
  });

  it('shows order summary when payment method is selected', () => {
    // Update the mock to include a selected payment method
    (usePurchaseStore as jest.Mock).mockReturnValue({
      selectedPlan: { id: 'basic', price: 99.99 },
      paymentMethod: 'Credit Card',
      errors: {},
      setPaymentMethod: mockSetPaymentMethod,
      setErrors: mockSetErrors,
      setStep: mockSetStep,
      validateCurrentStep: mockValidateCurrentStep
    });

    render(<PaymentPage />);

    expect(screen.getByText('Order Summary')).toBeInTheDocument();
    expect(screen.getByText('Plan ID')).toBeInTheDocument();
    expect(screen.getByText('Monthly Premium')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
    expect(screen.getByText('basic')).toBeInTheDocument();
    expect(screen.getAllByText('$99.99')).toHaveLength(2);
  });

  it('validates form and navigates to next step on successful submission', () => {
    render(<PaymentPage />);

    const form = screen.getByRole('form');
    fireEvent.submit(form);

    expect(mockValidateCurrentStep).toHaveBeenCalled();
    expect(mockSetStep).toHaveBeenCalledWith(5);
    expect(mockPush).toHaveBeenCalledWith('/purchase/confirmation');
  });

  it('does not navigate if validation fails', () => {
    mockValidateCurrentStep.mockReturnValueOnce(false);
    render(<PaymentPage />);

    const form = screen.getByRole('form');
    fireEvent.submit(form);

    expect(mockValidateCurrentStep).toHaveBeenCalled();
    expect(mockSetStep).not.toHaveBeenCalled();
    expect(mockPush).not.toHaveBeenCalled();
  });
});