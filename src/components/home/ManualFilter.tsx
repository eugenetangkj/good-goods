import { useState } from 'react';

type Format = 'Physical' | 'Online';
type Region = 'NE' | 'NW' | 'SE' | 'SW' | 'N' | 'S' | 'E' | 'W';
type GoodsType = 'Food and Beverages' | 'Retail';

interface FilterProps {
  onFilterChange: (filters: {
    format: Format | null;
    region: Region | null;
    goodsType: GoodsType | null;
  }) => void;
}

export const ManualFilter: React.FC<FilterProps> = ({ onFilterChange }) => {
  const [format, setFormat] = useState<Format | null>(null);
  const [region, setRegion] = useState<Region | null>(null);
  const [goodsType, setGoodsType] = useState<GoodsType | null>(null);

  const handleChange = () => {
    onFilterChange({ format, region, goodsType });
  };

  return (
    <div>
      <h3>Search Filters</h3>
      <div>
        <label>
          Format:
          <select
            value={format || ''}
            onChange={(e) => setFormat(e.target.value as Format | null)}
            onBlur={handleChange}
          >
            <option value="">All</option>
            <option value="Physical">Physical</option>
            <option value="Online">Online</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Region:
          <select
            value={region || ''}
            onChange={(e) => setRegion(e.target.value as Region | null)}
            onBlur={handleChange}
          >
            <option value="">All</option>
            <option value="NE">NE</option>
            <option value="NW">NW</option>
            <option value="SE">SE</option>
            <option value="SW">SW</option>
            <option value="N">N</option>
            <option value="S">S</option>
            <option value="E">E</option>
            <option value="W">W</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Type of Goods:
          <select
            value={goodsType || ''}
            onChange={(e) => setGoodsType(e.target.value as GoodsType | null)}
            onBlur={handleChange}
          >
            <option value="">All</option>
            <option value="Food and Beverages">Food and Beverages</option>
            <option value="Retail">Retail</option>
          </select>
        </label>
      </div>
    </div>
  );
};


