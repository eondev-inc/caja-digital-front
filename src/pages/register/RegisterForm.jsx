import PropTypes from 'prop-types';
import { RegisterPersonalFields } from './RegisterPersonalFields';
import { RegisterAccountFields } from './RegisterAccountFields';
import { RegisterTermsAndSubmit } from './RegisterTermsAndSubmit';

export const RegisterForm = ({
  register,
  handleSubmit,
  errors,
  isSubmitting,
  entities,
  loadingEntities,
  onSubmit,
}) => {
  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
      <RegisterPersonalFields register={register} errors={errors} />
      <RegisterAccountFields
        register={register}
        errors={errors}
        entities={entities}
        loadingEntities={loadingEntities}
      />
      <RegisterTermsAndSubmit
        register={register}
        errors={errors}
        isSubmitting={isSubmitting}
        loadingEntities={loadingEntities}
      />
    </form>
  );
};

RegisterForm.propTypes = {
  register: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  entities: PropTypes.array.isRequired,
  loadingEntities: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
