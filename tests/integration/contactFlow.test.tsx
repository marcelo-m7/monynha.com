import { fireEvent, render, screen } from '@testing-library/react';
import App from '../../src/App';

describe('contact flow', () => {
  it('shows validation feedback and success state for a valid submission', () => {
    window.history.pushState({}, '', '/contato');
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /get a diagnosis/i }));
    expect(screen.getByText(/Precisamos de um e-mail para responder/i)).toBeInTheDocument();
    expect(screen.getByText(/Descreva o contexto para prepararmos a conversa/i)).toBeInTheDocument();

    fireEvent.change(screen.getByRole('textbox', { name: /nome/i }), { target: { value: 'Alex' } });
    fireEvent.change(screen.getByRole('textbox', { name: /e-mail/i }), { target: { value: 'alex@example.com' } });
    fireEvent.change(screen.getByRole('textbox', { name: /contexto/i }), { target: { value: 'Precisamos reorganizar produto e operação.' } });
    fireEvent.click(screen.getByRole('button', { name: /get a diagnosis/i }));

    expect(screen.getByRole('status')).toHaveTextContent(/Mensagem recebida/i);
  });
});
