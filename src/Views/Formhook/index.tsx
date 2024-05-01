import { useForm, type FieldValues } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signUpSchema, TSignUpSchema } from '@/lib/types'

const Formhook = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        getValues,
    } = useForm<TSignUpSchema>({
        resolver: zodResolver(signUpSchema),
    })

    const onSubmit = async (data: TSignUpSchema) => {
        // submit to server
        await new Promise((resolve) => setTimeout(resolve, 1000))

        reset()
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col gap-y-2'
        >
            <input
                // {...register("email",{
                //     required: "Email is required",
                // })}
                {...register('email')}
                type='text'
                placeholder='Email'
                className='rounded'
            />
            {errors.email && (
                <p className='text-red-500'>{`${errors.email.message}`}</p>
            )}
            {/* <input
                {...register("password",{
                    required: "Password is required",
                    minLength: {
                        value: 10,
                        message: "Password must be at least 10 characters"
                    }
                })}
                type="password"
                placeholder="Password"
                className="rounded"
            /> */}
            <input
                {...register('password')}
                type='password'
                placeholder='Password'
                className='rounded'
            />
            {errors.password && (
                <p className='text-red-500'>{`${errors.password.message}`}</p>
            )}
            <input
                {...register('confirmPassword')}
                type='password'
                placeholder='Confirm Password'
                className='rounded'
            />
            {errors.confirmPassword && (
                <p className='text-red-500'>{`${errors.confirmPassword.message}`}</p>
            )}
            <button
                disabled={isSubmitting}
                type='submit'
                className='bg-blue disabled:bg-gray-500 rounded'
            >
                submit
            </button>
        </form>
    )
}

export default Formhook
