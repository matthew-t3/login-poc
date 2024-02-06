import { upperFirst, useToggle } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
  TextInput,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Stack,
  Container,
} from '@mantine/core';
import { GoogleButton } from './GoogleButton';
import { TwitterButton } from './TwitterButton';
import { WalletButton } from './WalletButton';

const HI_LOGIN_URL = import.meta.env.VITE_HI_LOGIN_URL ?? '';
const redirectURL = new URL(HI_LOGIN_URL);
const searchParams = new URLSearchParams();

const redirect = () => {
  redirectURL.search = searchParams.toString();
  window.location.href = redirectURL.toString();
};
export function AuthenticationForm(props: PaperProps) {
  const [isLoading, toggleLoading] = useToggle([false, true]);
  const form = useForm({
    initialValues: {
      email: '',
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
    },
  });

  const onFormSubmit = () => {
    toggleLoading();
    searchParams.set('email', form.values.email);
    searchParams.set('type', 'email');

    redirect();
  };

  const onClickWallet = () => {
    toggleLoading();
    searchParams.set('type', 'wallet');

    redirect();
  };

  const onClickTwitter = () => {
    toggleLoading();
    searchParams.set('type', 'twitter');

    redirect();
  };

  const onClickGoogle = () => {
    toggleLoading();
    searchParams.set('type', 'google');

    redirect();
  };

  return (
    <Container size={420} my={40}>
      <Paper radius='md' p='xl' withBorder {...props}>
        <Group grow mb='md' mt='md'>
          <WalletButton
            radius='md'
            color='yellow'
            onClick={onClickWallet}
            loading={isLoading}
          />
        </Group>
        <Divider
          label='Or continue with email'
          labelPosition='center'
          my='lg'
        />

        <form onSubmit={form.onSubmit(onFormSubmit)}>
          <Stack>
            <TextInput
              required
              label='Email'
              placeholder='hello@terminal3.io'
              value={form.values.email}
              onChange={(event) =>
                form.setFieldValue('email', event.currentTarget.value)
              }
              radius='md'
            />
          </Stack>

          <Group justify='space-between' mt='xl'>
            <Button type='submit' radius='md' fullWidth loading={isLoading}>
              {upperFirst('Login')}
            </Button>
          </Group>
        </form>

        <Divider
          label='Or continue with social media auth'
          labelPosition='center'
          my='lg'
        />
        <Group grow mb='md' mt='md'>
          <GoogleButton radius='md' onClick={onClickGoogle} loading={isLoading}>
            Google
          </GoogleButton>
          <TwitterButton
            radius='md'
            onClick={onClickTwitter}
            loading={isLoading}>
            Twitter
          </TwitterButton>
        </Group>
      </Paper>
    </Container>
  );
}
