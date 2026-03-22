import { render, screen } from '@testing-library/react';
import App from '../../src/App';

describe('homepage decision router', () => {
  it('renders the choose your path section and key navigation labels', () => {
    window.history.pushState({}, '', '/');
    render(<App />);

    expect(screen.getByText(/Choose your path/i)).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: 'Produtos' }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('link', { name: 'Serviços' }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('link', { name: 'Open Source' }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('link', { name: 'Contato' }).length).toBeGreaterThan(0);
  });
});
