import { usePurchaseStore } from '@/lib/store/purchaseStore';
import { fireEvent, render, screen } from '@testing-library/react';
import ConfirmationPage from '../page';

// Mock the purchase store
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

describe('ConfirmationPage', () => {
  beforeEach(() => {
    // Reset mocks
    mockPush.mockClear();

    // Setup mock store with purchase data
    (usePurchaseStore as jest.Mock).mockReturnValue({
      fullName: 'John Doe',
      email: 'john@example.com',
      selectedPlan: { id: 'premium', price: 199.99 },
      paymentMethod: 'Credit Card'
    });
  });

  it('renders the purchase confirmation page', () => {
    render(<ConfirmationPage />);

    expect(screen.getByText('Purchase Successful!')).toBeInTheDocument();
    expect(screen.getByText('Thank you for choosing our insurance service.')).toBeInTheDocument();
  });

  it('displays the purchase summary with correct information', () => {
    render(<ConfirmationPage />);

    expect(screen.getByText('Purchase Summary')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('premium')).toBeInTheDocument();
    expect(screen.getByText('$199.99')).toBeInTheDocument();
    expect(screen.getByText('Credit Card')).toBeInTheDocument();
  });

  it('navigates to home page when clicking the back to home button', () => {
    render(<ConfirmationPage />);

    const homeButton = screen.getByText('Back to Home');
    fireEvent.click(homeButton);

    expect(mockPush).toHaveBeenCalledWith('/');
  });
});