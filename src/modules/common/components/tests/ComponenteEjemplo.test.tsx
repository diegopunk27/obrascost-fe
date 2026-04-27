import ComponenteEjemplo from '@common-components/ComponenteEjemplo/ComponenteEjemplo.component';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('ComponenteEjemplo', () => {
  it('muestra el texto del componente', () => {
    render(<ComponenteEjemplo />);
    expect(screen.getByText('ComponenteEjemplo')).toBeInTheDocument();
  });
});
