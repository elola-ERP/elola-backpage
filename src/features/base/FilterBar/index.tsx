import React, { useState } from 'react';
import { Button } from '../button';
import { FilterBarProps, FilterField } from './type';

export const FilterBar: React.FC<FilterBarProps> = ({
    filtersConfig,
    onFilter
}) => {
    const [filters, setFilters] = useState<{ [key: string]: string }>({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters({
            ...filters,
            [name]: value
        });
    };

    const handleFilterClick = () => {
        onFilter(filters);
    };

    return (
        <div className="flex flex-row w-full gap-4 text-gray-3">
            {filtersConfig.map((field: FilterField) => (
                <div key={field.name} className="w-1/2">
                    <p>{field.label}</p>
                    {field.type === 'select' ? (
                        <select
                            className="border p-1 border-gray-5 rounded-[5px] w-full"
                            name={field.name}
                            value={filters[field.name] || ''}
                            onChange={handleInputChange}
                            title='filter-bar'
                        >
                            <option value="">All</option>
                            {field.options?.map(option => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <input
                            type={field.type}
                            name={field.name}
                            className="border p-1 border-gray-5 rounded-[5px] w-full"
                            value={filters[field.name] || ''}
                            onChange={handleInputChange}
                            title='filter-bar'
                        />
                    )}
                </div>
            ))}
            <div className="flex w-1/2 items-end">
                <Button
                    className="flex justify-center items-center h-9 rounded-[5px]"
                    onClick={handleFilterClick}
                >
                    Filter
                </Button>
            </div>
        </div>
    );
};
