import { render, screen } from '@testing-library/react';
import Home from '../page';

describe('Home Page', () => {
  it('renders the welcome heading', () => {
    render(<Home />);
    const heading = screen.getByText('Welcome to AI Insurance');
    expect(heading).toBeInTheDocument();
  });

  it('renders the quick links section', () => {
    render(<Home />);
    expect(screen.getByText('Quick Links')).toBeInTheDocument();
    expect(screen.getByText('Insurance Plans')).toBeInTheDocument();
    expect(screen.getByText('Claims')).toBeInTheDocument();
  });

  it('renders the insurance overview section', () => {
    render(<Home />);
    expect(screen.getByText('Your Insurance Overview')).toBeInTheDocument();
    expect(screen.getByText('View and manage your insurance policies in one place.')).toBeInTheDocument();
  });

  it('renders the quick actions section', () => {
    render(<Home />);
    expect(screen.getByText('Quick Actions')).toBeInTheDocument();
    expect(screen.getByText('File a claim or contact support with just a few clicks.')).toBeInTheDocument();
  });

  it('renders the statistics sections', () => {
    render(<Home />);
    expect(screen.getByText('Active Policies')).toBeInTheDocument();
    expect(screen.getByText('Open Claims')).toBeInTheDocument();
    expect(screen.getByText('Next Payment')).toBeInTheDocument();
  });
});