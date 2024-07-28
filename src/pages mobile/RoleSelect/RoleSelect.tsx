// src/components/SideMenu.tsx
import { Section } from '../../utils/interfaces';
import * as React from 'react';
import './RoleSelect.css';
import { MultiSelect } from 'primereact/multiselect';
interface RoleSelectProps {
  sections: Section[];
}

const RoleSelect: React.FC<RoleSelectProps> = ({ sections }) => {
  const [selectedSections, setSelectedSections] = React.useState<Section[]>(sections && sections.length > 0 ? [sections[0]] : []);

  const handleChange = (e: { value: Section[] }) => {
    setSelectedSections(e.value);
  };

  return (
    <div className="section main">
      <div className='roleSelectContentMobile'>
          <div className="card flex justify-content-center">
            <MultiSelect
              value={selectedSections}
              onChange={handleChange}
              options={sections}
              optionLabel="label"
              filter
              placeholder="Select Roles"
              maxSelectedLabels={2}
              className="w-full md:w-20rem"
            />
          </div>

        {selectedSections.map((section) => (
          <div key={section.id} id={section.id} className="section">
            <section.component />
          </div>
        )).reverse()}
      </div>
    </div>
  );
}

export default RoleSelect;
