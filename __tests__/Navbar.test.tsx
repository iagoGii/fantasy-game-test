import { render, screen, fireEvent } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import Navbar from '../components/Navbar';
import { describe, it, expect, vi, beforeEach } from 'vitest';


// Mock do usePathname
vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
}));

describe('Navbar', () => {
  beforeEach(() => {
    // Reset do mock antes de cada teste
    vi.mocked(usePathname).mockReset();
  });

  it('deve renderizar todos os links de navegação', () => {
    vi.mocked(usePathname).mockReturnValue('/');
    render(<Navbar />);
    
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Meu Time')).toBeInTheDocument();
    expect(screen.getByText('Ligas')).toBeInTheDocument();
  });

  it('deve destacar o link ativo', () => {
    vi.mocked(usePathname).mockReturnValue('/dashboard');
    render(<Navbar />);
    
    const activeLink = screen.getByText('Dashboard');
    expect(activeLink).toHaveClass('bg-blue-600');
    expect(activeLink).toHaveClass('text-white');
  });

  it('deve abrir e fechar o menu mobile', () => {
    vi.mocked(usePathname).mockReturnValue('/');
    render(<Navbar />);
    
    // Menu deve estar fechado inicialmente
    const menu = screen.getByRole('navigation');
    expect(menu).toHaveClass('hidden');
    
    // Abrir menu
    const menuButton = screen.getByLabelText('Toggle menu');
    fireEvent.click(menuButton);
    expect(menu).toHaveClass('flex');
    
    // Fechar menu
    fireEvent.click(menuButton);
    expect(menu).toHaveClass('hidden');
  });

  it('deve ser responsivo', () => {
    vi.mocked(usePathname).mockReturnValue('/');
    render(<Navbar />);
    
    // Verificar classes responsivas
    const menu = screen.getByRole('navigation');
    expect(menu).toHaveClass('md:flex-row');
    expect(menu).toHaveClass('md:items-center');
  });
}); 