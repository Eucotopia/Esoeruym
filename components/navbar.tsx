'use client'
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from '@nextui-org/navbar'
import NextLink from 'next/link'
import clsx from 'clsx'
import {
  Button,
  Link,
  Input,
  Kbd,
  link as linkStyles,
  Modal,
  ModalContent,
  useDisclosure,
  InputProps,
  Checkbox,
} from '@nextui-org/react'
import React, { useCallback, useState } from 'react'
import { Divider } from '@nextui-org/divider'
import { m } from 'framer-motion'
import { Icon } from '@iconify/react'

import { siteConfig } from '@/config/site'
import { ThemeSwitch } from '@/components/theme-switch'
import { TwitterIcon, GithubIcon, DiscordIcon, SearchIcon, Logo } from '@/components/icons'
import { LoginCredentialsType, useAuthenticateUserMutation } from '@/feature/api/authApi'
import { AppDispatch } from '@/app/store'

// extends Omit<InputProps, 'type'> 表示继承 InputProps 但是排除 type 属性
interface PasswordInputProps extends Omit<InputProps, 'type'> {
  isVisible: boolean
  toggleVisibility: () => void
}

interface AuthFormProps extends PasswordInputProps {
  onClose?: () => void
  setFormState: (state: 'login' | 'register' | 'forgotPassword') => void
  userState: LoginCredentialsType
  dispatch?: AppDispatch
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  isInvalid: boolean
  resetForm: () => void
}

const PasswordInput: React.FC<PasswordInputProps> = ({ isVisible, toggleVisibility, ...props }) => (
  <Input
    {...props}
    endContent={
      <button type="button" onClick={toggleVisibility}>
        <Icon
          className="pointer-events-none text-2xl text-default-400"
          icon={isVisible ? 'solar:eye-closed-linear' : 'solar:eye-bold'}
        />
      </button>
    }
    type={isVisible ? 'text' : 'password'}
    variant="bordered"
  />
)
const SignIn: React.FC<AuthFormProps> = ({
  onClose,
  setFormState,
  userState,
  dispatch,
  handleChange,
  resetForm,
  isInvalid,
  isVisible,
  toggleVisibility,
}) => {
  const [userLogin, { isLoading: isLoginLoading }] = useAuthenticateUserMutation()

  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [isFormVisible, setIsFormVisible] = useState(false)

  const variants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: 10 },
  }

  const userLoginHandle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const auth = await userLogin(userState).unwrap()

    if (dispatch) {
      // dispatch(setCredentials({...auth, isSelectRemember: isSelectRemember}))
      resetForm()
    }
    if (onClose) {
      onClose()
    }
  }

  // flex: 使得子元素默认水平排列
  // items-center:垂直方向居中对齐
  // shrink-0 阻止内容收缩，即便容器变小，OR 文本依旧保持大小
  // flex-grow: 设定为1，表示该元素可以占用父容器所有空间，当有多个元素使用 flex-1,它们会均分父容器剩余空间
  // flex-shrink: 设定为1，表示父容器空间不足时，元素可以缩小以适应容器大小
  // flex-basic: 通常为0，意味着在分配空间时，默认的基础宽度为零，这样元素的宽度只依赖于 flex-grow
  const orDivider = (
    <div className={'flex items-center gap-4 py-2'}>
      <Divider className={'flex-1'} />
      <div className={'shrink-0 text-tiny text-default-500'}>OR</div>
      <Divider className={'flex-1 '} />
    </div>
  )

  return (
    <>
      <Button onPress={onOpen}>Sign In</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {onClose => (
            <>
              <m.form
                animate="visible"
                className="flex flex-col gap-3"
                exit="hidden"
                initial="hidden"
                variants={variants}
                onSubmit={userLoginHandle}
              >
                <Input
                  errorMessage={isInvalid ? 'Please enter a valid email' : ''}
                  isInvalid={isInvalid}
                  label="Email Address"
                  name="email"
                  placeholder="Enter your email"
                  type="email"
                  value={userState.username}
                  variant="bordered"
                  onChange={handleChange}
                />
                <PasswordInput
                  isVisible={isVisible}
                  label="Password"
                  name="password"
                  placeholder="Enter your password"
                  toggleVisibility={toggleVisibility}
                  value={userState.password}
                  onChange={handleChange}
                />
                <div className="flex items-center justify-between px-1 py-2">
                  <Checkbox
                    isSelected={isSelectRemember}
                    name="remember"
                    size="sm"
                    onValueChange={setIsSelectRemember}
                  >
                    Remember me
                  </Checkbox>
                  <Link
                    className="text-default-500"
                    href="#"
                    size="sm"
                    onPress={() => {
                      setFormState('forgotPassword')
                      resetForm()
                    }}
                  >
                    Forgot password?
                  </Link>
                </div>
                <Button color="primary" isLoading={isLoginLoading} type="submit">
                  Log In
                </Button>
              </m.form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export const Navbar = () => {
  const [isVisible, setIsVisible] = React.useState(false)

  const toggleVisibility = useCallback(() => setIsVisible(prev => !prev), [])

  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: 'bg-default-100',
        input: 'text-sm',
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={['command']}>
          Kaaa
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  )

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit">ACME</p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map(item => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: 'foreground' }),
                  'data-[active=true]:text-primary data-[active=true]:font-medium'
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex basis-1/5 sm:basis-full" justify="end">
        <NavbarItem className="hidden sm:flex gap-2">
          <Link isExternal aria-label="Twitter" href={siteConfig.links.twitter}>
            <TwitterIcon className="text-default-500" />
          </Link>
          <Link isExternal aria-label="Discord" href={siteConfig.links.discord}>
            <DiscordIcon className="text-default-500" />
          </Link>
          <Link isExternal aria-label="Github" href={siteConfig.links.github}>
            <GithubIcon className="text-default-500" />
          </Link>
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
        <NavbarItem className="hidden md:flex">
          {/*<Button*/}
          {/*  isExternal*/}
          {/*  as={Link}*/}
          {/*  className="text-sm font-normal text-default-600 bg-default-100"*/}
          {/*  href={siteConfig.links.sponsor}*/}
          {/*  startContent={<HeartFilledIcon className="text-danger" />}*/}
          {/*  variant="flat"*/}
          {/*>*/}
          {/*  Sponsor*/}
          {/*</Button>*/}
          <SignIn isVisible={isVisible} />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link isExternal aria-label="Github" href={siteConfig.links.github}>
          <GithubIcon className="text-default-500" />
        </Link>
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        {searchInput}
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? 'primary'
                    : index === siteConfig.navMenuItems.length - 1
                      ? 'danger'
                      : 'foreground'
                }
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  )
}
