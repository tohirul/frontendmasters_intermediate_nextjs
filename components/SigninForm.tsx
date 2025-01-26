'use client'
import { Input } from '@nextui-org/react'
import Link from 'next/link'
import SubmitButton from './SubmitButton'
import { useActionState } from 'react'
import { LoginActionResponse } from '@/types/auth_types'
import { login_action } from '@/actions/auth_action'

const initState: LoginActionResponse = { errors: {} }
const SigninForm = () => {
  const [loginFormState, loginAction] = useActionState<
    LoginActionResponse,
    FormData
  >(
    async (
      state: LoginActionResponse,
      formData: FormData
    ): Promise<LoginActionResponse> => {
      try {
        return await login_action(state, formData)
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
      action={loginAction}
      className="flex flex-col gap-2 border-default-100 bg-content1 shadow-lg p-3 border rounded-md"
    >
      <h3 className="my-4">Sign in</h3>
      <Input
        fullWidth
        required
        size="lg"
        placeholder="Email"
        name="email"
        type="email"
        isInvalid={!!loginFormState.errors?.email}
        errorMessage={loginFormState.errors?.email?.join(', ')}
      />
      <Input
        name="password"
        fullWidth
        required
        size="lg"
        type="password"
        placeholder="Password"
        isInvalid={!!loginFormState.errors?.password}
        errorMessage={loginFormState.errors?.password?.join(', ')}
      />
      {loginFormState.errors?._form?.length &&
        loginFormState.errors._form.map((error, index) => (
          <p key={index} className="text-red-500">
            {error}
          </p>
        ))}
      <SubmitButton
        value="Sign in"
        className="w-full text-green-500"
        variant="bordered"
        color="success"
        type="submit"
      />
      <div>
        <Link href="/signup">{`Don't have an account?`}</Link>
      </div>
    </form>
  )
}

export default SigninForm
