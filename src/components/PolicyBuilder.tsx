// PolicyBuilder.tsx - Main Component
import React, { useState } from 'react';
import { Box } from '@mui/material';
import { UIComponents } from './UIComponents';

const { CustomSelect, CustomTextField, Button, IconButton, PolicySummary } = UIComponents;

interface PolicyCondition {
  id: string;
  action: string;
  target: string;
  attribute: string;
  operator: string;
  value: string;
  additionalTag?: string;
  connector?: string;
}

// PolicyCondition Props Interface
interface PolicyConditionProps {
  condition: PolicyCondition;
  onChange: (condition: PolicyCondition) => void;
  onRemove: () => void;
  showRemove?: boolean;
}

// Policy Condition Component
const PolicyCondition: React.FC<PolicyConditionProps> = ({ condition, onChange, onRemove, showRemove = false }) => {
  const updateCondition = (field: keyof PolicyCondition, value: string) => {
    onChange({ ...condition, [field]: value });
  };

  const actionOptions = ['Mask', 'Block', 'Allow', 'Log'];
  const targetOptions = ['columns tagged', 'rows where', 'all data'];
  const attributeOptions = ['Discovered', 'contains'];
  const operatorOptions = ['in', 'not in', 'equals', 'contains'];
  const connectorOptions = ['by making null', 'with encryption'];

  return (
    <Box mb={3}>
      <Box
        display="flex"
        alignItems="center"
        gap={1}
        mb={2}
        flexWrap="wrap"
      >
        <CustomSelect
          value={condition.action}
          options={actionOptions}
          onChange={(value: string) => updateCondition('action', value)}
          style={{ minWidth: '80px' }}
        />

        <CustomSelect
          value={condition.target}
          options={targetOptions}
          onChange={(value: string) => updateCondition('target', value)}
          style={{ minWidth: '120px' }}
        />

        <CustomSelect
          value={condition.attribute}
          options={attributeOptions}
          onChange={(value: string) => updateCondition('attribute', value)}
          style={{ minWidth: '140px' }}
        />

        <CustomSelect
          value={condition.operator}
          options={operatorOptions}
          onChange={(value: string) => updateCondition('operator', value)}
          style={{ minWidth: '60px' }}
        />

        <CustomTextField
          value={condition.value}
          onChange={(value: string) => updateCondition('value', value)}
          placeholder="Department"
          style={{ minWidth: '100px' }}
        />

        <CustomTextField
          value={condition.additionalTag || ''}
          onChange={(value: string) => updateCondition('additionalTag', value)}
          placeholder="add another tag (optional)"
          style={{ minWidth: '180px' }}
        />

        <CustomSelect
          value={condition.connector || ''}
          options={connectorOptions}
          onChange={(value: string) => updateCondition('connector', value)}
          style={{ minWidth: '120px' }}
        />



        {showRemove && (
          <IconButton onClick={onRemove}>
            ✕
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

// Main Policy Builder Component
export const PolicyBuilder = () => {
  const [policyName, setPolicyName] = useState('Mask-CC-Number');
  const [conditions, setConditions] = useState<PolicyCondition[]>([
    {
      id: '1',
      action: 'Mask',
      target: 'columns tagged',
      attribute: 'Discovered',
      operator: 'in',
      value: 'Credit Card Number',
      additionalTag: '',
      connector: 'by making null'
    }
  ]);

  const updateCondition = (conditionId: string, updatedCondition: PolicyCondition) => {
    setConditions((prev) =>
      prev.map((condition) =>
        condition.id === conditionId ? updatedCondition : condition
      )
    );
  };

  const addCondition = () => {
    const newCondition: PolicyCondition = {
      id: Date.now().toString(),
      action: '',
      target: '',
      attribute: '',
      operator: '',
      value: ''
    };
    setConditions((prev) => [...prev, newCondition]);
  };

  const removeCondition = (conditionId: string) => {
    setConditions((prev) => prev.filter((condition) => condition.id !== conditionId));
  };

  const handleCancel = () => {
    console.log('Cancel clicked');
  };

  const handleUpdate = () => {
    console.log('Update clicked', { policyName, conditions });
  };

  return (
    <Box
      maxWidth="1000px"
      mx="auto"
      bgcolor="white"
      borderRadius="8px"
      boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
      p={3}
    >
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <h2 style={{ fontWeight: '600', fontSize: '18px', margin: 0, color: '#333' }}>
          Global Data Policy Builder
        </h2>
        <Box display="flex" gap={2}>
          <a
            href="#"
            style={{ color: '#1976d2', textDecoration: 'none', fontSize: '14px' }}
            onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
              const target = e.currentTarget;
              target.style.textDecoration = 'underline';
            }}
            onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
              const target = e.currentTarget;
              target.style.textDecoration = 'none';
            }}
          >
            Add Certification
          </a>
          <a
            href="#"
            style={{ color: '#1976d2', textDecoration: 'none', fontSize: '14px' }}
            onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
              const target = e.currentTarget;
              target.style.textDecoration = 'underline';
            }}
            onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
              const target = e.currentTarget;
              target.style.textDecoration = 'none';
            }}
          >
            SQL Support Matrix
          </a>
        </Box>
      </Box>

      {/* Policy Name Section */}
      <Box mb={3}>
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <label style={{ fontWeight: '500', fontSize: '14px', color: '#333' }}>
            What's the name of this policy?
          </label>
          <span style={{ color: '#666', cursor: 'help', fontSize: '16px' }}>ⓘ</span>
        </Box>
        <CustomTextField
          value={policyName}
          onChange={setPolicyName}
          placeholder="Enter policy name"
          fullWidth
          style={{ maxWidth: '300px' }}
        />
      </Box>

      {/* Policy Protection Section */}
      <Box mb={3}>
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <label style={{ fontWeight: '500', fontSize: '14px', color: '#333' }}>
            How should this policy protect the data?
          </label>
          <span style={{ color: '#666', cursor: 'help', fontSize: '16px' }}>ⓘ</span>
        </Box>

        {/* Conditions Container */}
        <Box border="1px solid #e0e0e0" borderRadius="4px" p={2} mb={2}>
          {conditions.map((condition) => (
            <PolicyCondition
              key={condition.id}
              condition={condition}
              onChange={(updatedCondition) => updateCondition(condition.id, updatedCondition)}
              onRemove={() => removeCondition(condition.id)}
              showRemove={conditions.length > 1}
            />
          ))}

          {/* Add Another Condition Button */}
          <Button variant="text" onClick={addCondition} startIcon="+" style={{ padding: '4px 8px' }}>
            Add Another Condition
          </Button>
        </Box>

        {/* Policy Summary */}
        <PolicySummary summary="Only allow Managers to see credit card numbers" />
      </Box>

      <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '24px 0' }} />

      {/* Action Buttons */}
      <Box display="flex" justifyContent="flex-end" gap={2}>
        <Button variant="outlined" onClick={handleCancel} startIcon={null}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleUpdate} startIcon={null}>
          Update
        </Button>
      </Box>
    </Box>
  );
};
