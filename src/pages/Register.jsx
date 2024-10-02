import { Button, Checkbox, Label, Select, TextInput } from "flowbite-react";
import { useStore } from "../app/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { schema } from "../utils/validationSchema";
import { registerUser } from "../api/auth/register.pots";

export const Register = () => {
  const { formData, setFormData } = useStore();
  const { 
    register, 
    handleSubmit,
    formState: { errors } 
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: formData,
    mode: "onBlur"
  });

  const onSubmit = async (data) => {
    setFormData(data);
    registerUser(formData);
  }

  return(
    <section className="dark:bg-gray-900">
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        <div className="w-full rounded-lg border-slate-400 bg-white shadow-xl dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
                Create an account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <Label htmlFor="surnames" className="mb-2 block text-start text-sm font-medium text-gray-900 dark:text-white" value="Name" />
                <TextInput type="text" name="surnames" 
                  {...register('surnames')}
                  id="surnames" 
                  className="block w-full rounded-lg 
                    text-sm text-gray-900 
                    dark:border-gray-600 dark:bg-gray-700 dark:text-white 
                    dark:placeholder:text-gray-400 
                    dark:focus:border-blue-500 
                    dark:focus:ring-blue-500" 
                  placeholder="John"
                />
                { errors.surnames && <p className="mx-1 text-left text-sm text-red-500">{ errors.surnames.message }</p> }
              </div>
              <div>
                <Label htmlFor="forenames" className="mb-2 block text-start text-sm font-medium text-gray-900 dark:text-white" value="Lastnames" />
                <TextInput type="text" name="forenames"
                  {...register('forenames')}
                  id="forenames" 
                  className="block w-full rounded-lg 
                  text-sm text-gray-900 
                  dark:border-gray-600 dark:bg-gray-700 dark:text-white 
                  dark:placeholder:text-gray-400 dark:focus:border-blue-500 
                  dark:focus:ring-blue-500" 
                  placeholder="Doe" 
                />
                { errors.forenames && <p className="mx-1 text-left text-sm text-red-500">{ errors.forenames.message }</p> }
              </div>
              <Label htmlFor="nidType" className="mb-2 block text-start text-sm font-medium text-gray-900 dark:text-white" value="Identification" />
              <div className="flex flex-row items-start space-x-16">
                <div className="flex h-5 items-center">
                  <Select defaultValue="rut" id="nidType" name="nidType" htmlFor="nidType"
                    className="block w-full 
                    rounded-lg text-gray-900 
                    dark:border-gray-600 dark:bg-gray-700 dark:text-white 
                    dark:placeholder:text-gray-400 dark:focus:border-blue-500 
                    dark:focus:ring-blue-500"
                  >
                    <option value="pasaporte">Pasaporte</option>
                    <option value="rut">RUT</option>
                  </Select>
                  {errors.nidType && <p className="mx-1 text-left text-sm text-red-500">{errors.nidType.message}</p>}
                </div>
                <div className="flex h-5 items-center">
                  <TextInput type="text" name="nid" id="nid"
                    {...register('nid')}
                    className="block w-full 
                    rounded-lg text-sm 
                    text-gray-900 dark:border-gray-600 
                    dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 
                    dark:focus:border-blue-500 dark:focus:ring-blue-500" 
                    placeholder="11.111.111-1"
                  />
                </div>
              </div>
              { errors.nid && <p className="mx-1 text-left text-sm text-red-500">{errors.nid.message}</p> }
              <div>
                <Label htmlFor="email" className="mb-2 block text-start text-sm font-medium text-gray-900 dark:text-white" value="Your email" />
                <TextInput type="email" name="email"
                  {...register('email')}
                  id="email" 
                  className="block w-full 
                  rounded-lg text-sm 
                  text-gray-900 dark:border-gray-600 
                  dark:bg-gray-700 dark:text-white 
                  dark:placeholder:text-gray-400 
                  dark:focus:border-blue-500 dark:focus:ring-blue-500" 
                  placeholder="name@company.com" 
                />
                {errors.email && <p className="mx-1 text-left text-sm text-red-500">{errors.email.message}</p>}
              </div>
              <div>
                <Label htmlFor="password" className="mb-2 block text-start text-sm font-medium text-gray-900 dark:text-white" value="Password" />
                <TextInput type="password" name="password" 
                  {...register('password')}
                  id="password" placeholder="••••••••" 
                  className="block w-full 
                  rounded-lg text-sm 
                  text-gray-900 dark:border-gray-600 
                  dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 
                  dark:focus:border-blue-500 dark:focus:ring-blue-500" 
                />
                {errors.password && <p className="mx-1 text-left text-sm text-red-500">{errors.password.message}</p>}
              </div>
              <div>
                <Label htmlFor="confirm-password" className="mb-2 block text-start text-sm font-medium text-gray-900 dark:text-white" value="Confirm password" />
                <TextInput type="password" name="confirm-password"
                  {...register('confirmPassword')}
                  id="confirm-password" placeholder="••••••••" 
                  className="block w-full 
                  rounded-lg text-sm 
                  text-gray-900 dark:border-gray-600 
                  dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 
                  dark:focus:border-blue-500 dark:focus:ring-blue-500" 
                />
                {errors.confirmPassword && <p className="mx-1 text-left text-sm text-red-500">{errors.confirmPassword.message}</p>}
              </div>
              <div className="flex items-start">
                <div className="flex h-5 items-center">
                  <Checkbox id="terms" name="terms" aria-describedby="terms"
                    {...register('checkBox')}
                    className="size-4 rounded border border-gray-300 
                    bg-gray-50 focus:ring-primary-300 dark:border-gray-600 
                    dark:bg-gray-700 dark:ring-offset-gray-800 
                    dark:focus:ring-primary-600" 
                  />
                </div>
                <div className="ml-3 text-sm">
                  <Label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300" value="I accept the "/>
                  <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a>
                </div>
              </div>
              <Button color="blue" type="submit" className="w-full rounded-lg bg-primary-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</Button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account? <a href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
