import { Button, ButtonProps } from '@mantine/core';
import React from 'react';

export function WalletButton(
  props: ButtonProps & React.ComponentPropsWithoutRef<'button'>,
) {
  return <Button {...props}>Connect Wallet</Button>;
}
