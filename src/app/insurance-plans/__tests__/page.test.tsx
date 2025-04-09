import { render, screen } from '@testing-library/react';
import InsurancePlansPage from '../page';

// Mock Next.js router
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  })
}));

describe('Insurance Plans Page', () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it('renders the page title', () => {
    render(<InsurancePlansPage />);
    expect(screen.getByText('Insurance Plans')).toBeInTheDocument();
  });

  it('displays all insurance plan cards', () => {
    render(<InsurancePlansPage />);

    // Check for plan names
    expect(screen.getByText('Basic Coverage')).toBeInTheDocument();
    expect(screen.getByText('Premium Coverage')).toBeInTheDocument();
    expect(screen.getByText('Business Coverage')).toBeInTheDocument();
  });

  it('shows the recommended badge for the premium plan', () => {
    render(<InsurancePlansPage />);

    expect(screen.getByText('Recommended')).toBeInTheDocument();
  });

  it('displays plan prices correctly', () => {
    render(<InsurancePlansPage />);

    expect(screen.getByText('$99.99')).toBeInTheDocument();
    expect(screen.getByText('$199.99')).toBeInTheDocument();
    expect(screen.getByText('$299.99')).toBeInTheDocument();
  });

  it('shows features for each plan', () => {
    render(<InsurancePlansPage />);

    // Check for some specific features
    expect(screen.getByText('Personal liability coverage')).toBeInTheDocument();
    expect(screen.getByText('Extended liability coverage')).toBeInTheDocument();
    expect(screen.getByText('Business interruption coverage')).toBeInTheDocument();
  });

  it('has purchase buttons for each plan', () => {
    render(<InsurancePlansPage />);

    const purchaseButtons = screen.getAllByText('Get Started');
    expect(purchaseButtons).toHaveLength(3);
  });

  it('has links to the correct insurance plan pages', () => {
    render(<InsurancePlansPage />);

    const purchaseButtons = screen.getAllByText('Get Started');

    // Check that the first button (basic plan) links to the correct URL
    expect(purchaseButtons[0].closest('a')).toHaveAttribute('href', '/insurance-plans/basic');

    // Check that the second button (premium plan) links to the correct URL
    expect(purchaseButtons[1].closest('a')).toHaveAttribute('href', '/insurance-plans/premium');

    // Check that the third button (business plan) links to the correct URL
    expect(purchaseButtons[2].closest('a')).toHaveAttribute('href', '/insurance-plans/business');
  });
});