'use client'

import { register_action } from '@/actions/auth_action'
import { RegisterActionResponse } from '@/types/auth_types'
import { Input } from '@nextui-org/react'
import Link from 'next/link'
import { useActionState } from 'react'
import SubmitButton from '@/components/SubmitButton'
const initState: RegisterActionResponse = { errors: {} }
const SignupForm = (): React.ReactElement => {
  const [registerFormState, registerAction] = useActionState<
    RegisterActionResponse,
    FormData
  >(
    async (
      state: RegisterActionResponse,
      formData: FormData
    ): Promise<RegisterActionResponse> => {
      try {
        return await register_action(state, formData)
      } catch (error) {
        return {
          errors: {
            ...state?.errors,
            _form: [
              error instanceof Error
                ? error.message
                : 'An unexpected error occurred.',
              'Please try again.',
            ],
          },
        }
      }
    },
    initState
  )

  return (
    <form
      action={registerAction}
      className="flex flex-col gap-2 border-default-100 bg-content1 shadow-lg p-3 border rounded-md"
    >
      <h3 className="my-4">Sign up</h3>
      <Input
        fullWidth
        size="lg"
        placeholder="Email"
        name="email"
        required
        isInvalid={!!registerFormState.errors?.email}
        errorMessage={registerFormState.errors?.email?.join(', ')}
      />
      <Input
        name="password"
        fullWidth
        size="lg"
        type="password"
        placeholder="Password"
        required
        isInvalid={!!registerFormState.errors?.password}
        errorMessage={registerFormState.errors?.password?.join(', ')}
      />
      {registerFormState?.errors?._form?.length &&
        registerFormState.errors?._form?.map((error: string) => (
          <p key={error} className="text-red-500">
            {error}
          </p>
        ))}
      <SubmitButton
        value="Sign up"
        className="w-full text-green-500"
        variant="bordered"
        color="success"
        type="submit"
      />
      <div>
        <Link href="/signin">Already have an account?</Link>
      </div>
    </form>
  )
}

export default SignupForm
