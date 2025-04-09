import { usePurchaseStore } from '@/lib/store/purchaseStore';
import { fireEvent, render, screen } from '@testing-library/react';
import SelectPlanPage from '../page';

// Mock the purchase store
const mockSetSelectedPlan = jest.fn();
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

describe('SelectPlanPage', () => {
  beforeEach(() => {
    // Reset mocks
    mockSetSelectedPlan.mockClear();
    mockSetErrors.mockClear();
    mockSetStep.mockClear();
    mockPush.mockClear();
    mockValidateCurrentStep.mockClear();

    // Setup mock store
    (usePurchaseStore as jest.Mock).mockReturnValue({
      selectedPlan: null,
      errors: {},
      setSelectedPlan: mockSetSelectedPlan,
      setErrors: mockSetErrors,
      setStep: mockSetStep,
      validateCurrentStep: mockValidateCurrentStep
    });
  });

  it('renders the plan selection form', () => {
    render(<SelectPlanPage />);

    expect(screen.getByText('Basic Coverage')).toBeInTheDocument();
    expect(screen.getByText('Premium Coverage')).toBeInTheDocument();
    expect(screen.getByText('Business Coverage')).toBeInTheDocument();
    expect(screen.getByText('Recommended')).toBeInTheDocument();
  });

  it('displays plan prices correctly', () => {
    render(<SelectPlanPage />);

    expect(screen.getByText('$99.99')).toBeInTheDocument();
    expect(screen.getByText('$199.99')).toBeInTheDocument();
    expect(screen.getByText('$299.99')).toBeInTheDocument();
  });

  it('selects a plan when clicked', () => {
    render(<SelectPlanPage />);

    // Find the basic plan and click it
    const basicPlan = screen.getByText('Basic Coverage').closest('div');
    fireEvent.click(basicPlan);

    // Check that the plan was selected
    expect(mockSetSelectedPlan).toHaveBeenCalledWith(expect.objectContaining({
      id: 'basic',
      name: 'Basic Coverage'
    }));
    expect(mockSetErrors).toHaveBeenCalledWith({});
  });

  it('validates form and navigates to next step on successful submission', () => {
    render(<SelectPlanPage />);

    const form = screen.getByRole('form');
    fireEvent.submit(form);

    expect(mockValidateCurrentStep).toHaveBeenCalled();
    expect(mockSetStep).toHaveBeenCalledWith(4);
    expect(mockPush).toHaveBeenCalledWith('/purchase/payment');
  });

  it('does not navigate if validation fails', () => {
    mockValidateCurrentStep.mockReturnValueOnce(false);
    render(<SelectPlanPage />);

    const form = screen.getByRole('form');
    fireEvent.submit(form);

    expect(mockValidateCurrentStep).toHaveBeenCalled();
    expect(mockSetStep).not.toHaveBeenCalled();
    expect(mockPush).not.toHaveBeenCalled();
  });
});