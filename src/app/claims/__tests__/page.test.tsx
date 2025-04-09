import { fireEvent, render, screen } from '@testing-library/react';
import ClaimsPage from '../page';

// Mock Next.js router
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Mock window.alert
const mockAlert = jest.fn();
global.alert = mockAlert;

describe('Claims Page', () => {
  beforeEach(() => {
    mockPush.mockClear();
    mockAlert.mockClear();
  });

  it('renders the page title', () => {
    render(<ClaimsPage />);
    expect(screen.getByText('File a Claim')).toBeInTheDocument();
    expect(screen.getByText('Submit your insurance claim in just a few steps')).toBeInTheDocument();
  });

  it('displays the progress steps', () => {
    render(<ClaimsPage />);
    const steps = screen.getAllByText(/[123]/).filter(el => el.tagName !== 'PATH');
    expect(steps).toHaveLength(3);
  });

  it('shows the first step form by default', () => {
    render(<ClaimsPage />);
    expect(screen.getByLabelText('Policy Number')).toBeInTheDocument();
    expect(screen.getByLabelText('Incident Date')).toBeInTheDocument();
    expect(screen.getByLabelText('Incident Type')).toBeInTheDocument();
  });

  it('allows input in the policy number field', () => {
    render(<ClaimsPage />);
    const policyInput = screen.getByLabelText('Policy Number');
    fireEvent.change(policyInput, { target: { value: 'POL-12345' } });
    expect(policyInput).toHaveValue('POL-12345');
  });

  it('allows selecting an incident type', () => {
    render(<ClaimsPage />);
    const selectElement = screen.getByLabelText('Incident Type');
    fireEvent.change(selectElement, { target: { value: 'Vehicle Accident' } });
    expect(selectElement).toHaveValue('Vehicle Accident');
  });

  it('navigates to the next step when clicking Next', () => {
    render(<ClaimsPage />);

    // Fill out first step
    fireEvent.change(screen.getByLabelText('Policy Number'), { target: { value: 'POL-12345' } });
    fireEvent.change(screen.getByLabelText('Incident Date'), { target: { value: '2023-05-15' } });
    fireEvent.change(screen.getByLabelText('Incident Type'), { target: { value: 'Vehicle Accident' } });

    // Click Next
    fireEvent.click(screen.getByText('Next'));

    // Should now show the second step
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
  });
});