// UIComponents.tsx - Reusable UI Components
import React, { useState, CSSProperties, MouseEvent } from 'react';

type StyleObject = {
  [key: string]: string | number;
};

interface CustomSelectProps {
  value: string;
  options: string[];
  onChange: (value: string) => void;
  style?: StyleObject;
  placeholder?: string;
}

interface CustomTextFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  style?: StyleObject;
  fullWidth?: boolean;
  multiline?: boolean;
  rows?: number;
}

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'contained' | 'outlined' | 'text';
  startIcon?: React.ReactNode;
  style?: StyleObject;
}

interface IconButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  style?: StyleObject;
}

interface PolicySummaryProps {
  summary: string;
}

// Custom Select Component
const CustomSelect: React.FC<CustomSelectProps> = ({ value, options, onChange, style = {}, placeholder = '' }) => {
  const [isOpen, setIsOpen] = useState(false);

  const baseStyle: React.CSSProperties = {
    position: 'relative',
    minWidth: '120px',
    ...style
  };

  const selectStyle: React.CSSProperties = {
    width: '100%',
    padding: '8px 32px 8px 12px',
    border: '1px solid #e0e0e0',
    borderRadius: '4px',
    fontSize: '14px',
    color: value ? '#1976d2' : '#666',
    fontWeight: value ? '500' : '400',
    backgroundColor: 'white',
    cursor: 'pointer',
    outline: 'none',
    appearance: 'none',
    fontFamily: 'inherit'
  };

  const arrowStyle: React.CSSProperties = {
    position: 'absolute',
    right: '8px',
    top: '50%',
    transform: `translateY(-50%) rotate(${isOpen ? '180deg' : '0deg'})`,
    transition: 'transform 0.2s ease',
    pointerEvents: 'none',
    fontSize: '12px',
    color: '#666'
  };

  const dropdownStyle: React.CSSProperties = {
    position: 'absolute',
    top: '100%',
    left: '0',
    right: '0',
    backgroundColor: 'white',
    border: '1px solid #e0e0e0',
    borderRadius: '4px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
    maxHeight: '200px',
    overflowY: 'auto'
  };

  const optionStyle: React.CSSProperties = {
    padding: '8px 12px',
    fontSize: '14px',
    cursor: 'pointer',
    borderBottom: '1px solid #f0f0f0'
  };

  return (
    <div style={baseStyle}>
      <div
        style={selectStyle}
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        tabIndex={0}
      >
        {value || placeholder}
      </div>
      <div style={arrowStyle}>▼</div>
      {isOpen && (
        <div style={dropdownStyle}>
          {placeholder && !value && (
            <div
              style={{...optionStyle, color: '#999'}}
              onClick={() => {
                onChange('');
                setIsOpen(false);
              }}
            >
              {placeholder}
            </div>
          )}
          {options.map((option) => (
            <div
              key={option}
              style={{
                ...optionStyle,
                backgroundColor: option === value ? '#f5f5f5' : 'white'
              }}
              onMouseEnter={(e) => {
                const target = e.target as HTMLDivElement;
                target.style.backgroundColor = '#f5f5f5';
              }}
              onMouseLeave={(e) => {
                const target = e.target as HTMLDivElement;
                target.style.backgroundColor = option === value ? '#f5f5f5' : 'white';
              }}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Custom TextField Component
const CustomTextField: React.FC<CustomTextFieldProps> = ({ 
  value, 
  onChange, 
  placeholder = '', 
  style = {}, 
  fullWidth = false, 
  multiline = false, 
  rows = 1 
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const baseStyle: React.CSSProperties = {
    width: fullWidth ? '100%' : 'auto',
    ...style
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '8px 12px',
    border: '1px solid #e0e0e0',
    borderRadius: '4px',
    fontSize: '14px',
    color: value ? '#1976d2' : '#666',
    fontWeight: value ? '500' : '400',
    backgroundColor: 'white',
    outline: 'none',
    fontFamily: 'inherit',
    resize: multiline ? 'vertical' as const : 'none' as const
  };

  const focusStyle: React.CSSProperties = {
    borderColor: '#1976d2'
  };

  return (
    <div style={baseStyle}>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          style={{
            ...inputStyle,
            ...(isFocused ? focusStyle : {}),
            minHeight: `${rows * 1.5}em`
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={{
            ...inputStyle,
            ...(isFocused ? focusStyle : {})
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      )}
    </div>
  );
};

// Button Component
const Button: React.FC<ButtonProps> = ({ children, onClick, variant = 'contained', startIcon, style = {} }) => {
  const [isHovered, setIsHovered] = useState(false);

  const baseStyle: React.CSSProperties = {
    padding: '8px 16px',
    borderRadius: '4px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    border: 'none',
    outline: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.2s ease',
    fontFamily: 'inherit',
    textTransform: 'none' as const
  };

  const variantStyles: Record<Required<ButtonProps>['variant'], React.CSSProperties> = {
    contained: {
      backgroundColor: isHovered ? '#651fff' : '#7c4dff',
      color: 'white'
    },
    outlined: {
      backgroundColor: isHovered ? 'rgba(0, 0, 0, 0.04)' : 'transparent',
      color: '#666',
      border: `1px solid ${isHovered ? '#999' : '#ccc'}`
    },
    text: {
      backgroundColor: isHovered ? 'rgba(25, 118, 210, 0.04)' : 'transparent',
      color: '#1976d2'
    }
  };

  return (
    <button
      style={{
        ...baseStyle,
        ...variantStyles[variant],
        ...style
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {startIcon && <span>{startIcon}</span>}
      {children}
    </button>
  );
};

// IconButton Component
const IconButton: React.FC<IconButtonProps> = ({ children, onClick, style = {} }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      style={{
        padding: '4px',
        border: 'none',
        backgroundColor: 'transparent',
        cursor: 'pointer',
        borderRadius: '50%',
        color: isHovered ? '#d32f2f' : '#666',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'color 0.2s ease',
        ...style
      } as React.CSSProperties}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </button>
  );
};

// Policy Summary Component
const PolicySummary: React.FC<PolicySummaryProps> = ({ summary }) => {
  return (
    <div
      style={{
        backgroundColor: '#f5f5f5',
        padding: '12px 16px',
        borderRadius: '4px',
        border: '1px solid #e0e0e0',
        marginTop: '16px',
        marginBottom: '16px',
      }}
    >
      <div
        style={{
          fontSize: '14px',
          color: '#666',
          fontStyle: 'italic',
        }}
      >
        {summary}
      </div>
    </div>
  );
};

// Export all components
export const UIComponents = {
  CustomSelect,
  CustomTextField,
  Button,
  IconButton,
  PolicySummary
};