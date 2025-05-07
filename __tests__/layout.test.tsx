import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import RootLayout from '../app/layout';
import { describe, it, expect } from 'vitest';

// Mock Wrapper component
const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => <>{children}</>;

describe('RootLayout', () => {
  it('deve renderizar corretamente', () => {
    const { container } = render(
      <Wrapper>
        <RootLayout>
          <div>Conteúdo de teste</div>
        </RootLayout>
      </Wrapper>
    );
    expect(container).toBeInTheDocument();
  });
});