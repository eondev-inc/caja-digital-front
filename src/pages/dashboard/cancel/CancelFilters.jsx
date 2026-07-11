import PropTypes from 'prop-types';
import { TextInput, Button } from 'flowbite-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export const CancelFilters = ({
  searchTerm,
  onSearchTermChange,
  onSearch,
  loading,
  totalItems,
}) => {
  return (
    <>
      <div className="mb-4 flex gap-3">
        <TextInput
          className="flex-1"
          icon={() => (
            <FontAwesomeIcon
              icon={faSearch}
              className="size-4 text-neutral-400"
              aria-hidden="true"
            />
          )}
          placeholder="Buscar por folio o descripción..."
          value={searchTerm}
          onChange={(e) => onSearchTermChange(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSearch()}
          aria-label="Buscar transacciones"
        />
        <Button color="blue" onClick={onSearch} disabled={loading}>
          <FontAwesomeIcon
            icon={faSearch}
            className="mr-2"
            aria-hidden="true"
          />
          Buscar
        </Button>
      </div>

      <div className="mb-4 flex items-center justify-end gap-2 text-sm text-neutral-500 dark:text-neutral-400">
        <span>Total de movimientos:</span>
        <span className="font-semibold text-neutral-800 dark:text-neutral-50">
          {totalItems}
        </span>
      </div>
    </>
  );
};

CancelFilters.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onSearchTermChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  totalItems: PropTypes.number.isRequired,
};
