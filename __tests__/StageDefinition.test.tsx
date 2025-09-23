import StageDefinition from '@/StageDefinition';
import { render, screen } from '@testing-library/react-native';
import React from 'react';

// Mock the ThemeContext
jest.mock('@/ThemeContext', () => ({
  useTheme: () => ({
    colors: {
      background: '#ffffff',
      surface: '#f8f9fa',
      text: '#212529',
      tableBorder: '#dee2e6',
      tableHeaderBg: '#f8f9fa',
    },
  }),
}));

describe('StageDefinition', () => {
  it('renders correctly with stage definitions', () => {
    const stageDefinition = {
      development: ['dev1', 'dev2'],
      staging: ['stage1'],
      production: ['prod1', 'prod2', 'prod3'],
    };
    render(<StageDefinition stageDefinition={stageDefinition} />);
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it('renders correctly with empty stage definitions', () => {
    const stageDefinition = {};
    render(<StageDefinition stageDefinition={stageDefinition} />);
    expect(screen.toJSON()).toMatchSnapshot();
  });
});
