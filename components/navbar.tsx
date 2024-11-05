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
  ResizablePanel,
  ModalBody,
  Tooltip,
} from '@nextui-org/react'
import React, { ChangeEvent, useCallback, useState } from 'react'
import { Divider } from '@nextui-org/divider'
import { AnimatePresence, domAnimation, LazyMotion, m } from 'framer-motion'
import { Icon } from '@iconify/react'
import { ModalFooter, ModalHeader } from '@nextui-org/modal'

import { siteConfig } from '@/config/site'
import { ThemeSwitch } from '@/components/theme-switch'
import { TwitterIcon, GithubIcon, DiscordIcon, Logo } from '@/components/icons'
import { LoginCredentialsType, useAuthenticateUserMutation } from '@/feature/api/authApi'

// extends Omit<InputProps, 'type'> 表示继承 InputProps 但是排除 type 属性
interface PasswordInputProps extends Omit<InputProps, 'type'> {
  isVisible?: boolean
  toggleVisibility?: () => void
}

type AuthFormMode = 'SignIn' | 'SignUp' | 'ResetPassword'

interface authFormProps extends PasswordInputProps {
  setAuthFormMode: React.Dispatch<React.SetStateAction<AuthFormMode>>
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
const SignUp: React.FC<authFormProps> = ({ setAuthFormMode }) => {
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false)
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = React.useState(false)
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')
  const [[page, direction], setPage] = React.useState([0, 0])
  const [isEmailValid, setIsEmailValid] = React.useState(true)
  const [isPasswordValid, setIsPasswordValid] = React.useState(true)
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = React.useState(true)

  const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible)
  const toggleConfirmPasswordVisibility = () =>
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible)

  const Title = React.useCallback(
    (props: React.PropsWithChildren<{}>) => (
      <m.h1
        animate={{ opacity: 1, x: 0 }}
        className="text-xl font-medium"
        exit={{ opacity: 0, x: -10 }}
        initial={{ opacity: 0, x: -10 }}
      >
        {props.children}
      </m.h1>
    ),
    [page]
  )

  const titleContent = React.useMemo(() => {
    return page === 0 ? 'Sign Up' : page === 1 ? 'Enter Password' : 'Confirm Password'
  }, [page])

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 50 : -50,
      opacity: 0,
    }),
  }

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection])
  }

  const handleEmailSubmit = () => {
    if (!email.length) {
      setIsEmailValid(false)

      return
    }
    setIsEmailValid(true)
    paginate(1)
  }

  const handlePasswordSubmit = () => {
    if (!password.length) {
      setIsPasswordValid(false)

      return
    }
    setIsPasswordValid(true)
    paginate(1)
  }

  const handleConfirmPasswordSubmit = () => {
    if (!confirmPassword.length || confirmPassword !== password) {
      setIsConfirmPasswordValid(false)

      return
    }
    setIsConfirmPasswordValid(true)
    // Submit logic or API call here
    console.log(`Email: ${email}, Password: ${password}`)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    switch (page) {
      case 0:
        handleEmailSubmit()
        break
      case 1:
        handlePasswordSubmit()
        break
      case 2:
        handleConfirmPasswordSubmit()
        break
      default:
        break
    }
  }

  return (
    <>
      <LazyMotion features={domAnimation}>
        <m.div className="flex min-h-[40px] items-center gap-2 pb-2">
          <AnimatePresence initial={false} mode="popLayout">
            {page >= 1 && (
              <m.div
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                initial={{ opacity: 0, x: -10 }}
              >
                <Tooltip content="Go back" delay={3000}>
                  <Button isIconOnly size="sm" variant="flat" onPress={() => paginate(-1)}>
                    <Icon
                      className="text-default-500"
                      icon="solar:alt-arrow-left-linear"
                      width={16}
                    />
                  </Button>
                </Tooltip>
              </m.div>
            )}
          </AnimatePresence>
          <AnimatePresence custom={direction} initial={false} mode="wait">
            <Title>{titleContent}</Title>
          </AnimatePresence>
        </m.div>
        <AnimatePresence custom={direction} initial={false} mode="wait">
          <m.form
            key={page}
            animate="center"
            className="flex flex-col gap-5"
            custom={direction}
            exit="exit"
            initial="enter"
            transition={{ duration: 0.2 }}
            variants={variants}
            onSubmit={handleSubmit}
          >
            {page === 0 && (
              <Input
                isRequired
                label="Email Address"
                name="email"
                type="email"
                validationState={isEmailValid ? 'valid' : 'invalid'}
                value={email}
                onValueChange={value => {
                  setIsEmailValid(true)
                  setEmail(value)
                }}
              />
            )}
            {page === 1 && (
              <Input
                isRequired
                endContent={
                  <button type="button" onClick={togglePasswordVisibility}>
                    {isPasswordVisible ? (
                      <Icon
                        className="pointer-events-none text-2xl text-default-400"
                        icon="solar:eye-closed-linear"
                      />
                    ) : (
                      <Icon
                        className="pointer-events-none text-2xl text-default-400 "
                        icon="solar:eye-bold"
                      />
                    )}
                  </button>
                }
                label="Password"
                name="password"
                type={isPasswordVisible ? 'text' : 'password'}
                validationState={isPasswordValid ? 'valid' : 'invalid'}
                value={password}
                onValueChange={value => {
                  setIsPasswordValid(true)
                  setPassword(value)
                }}
              />
            )}
            {page === 2 && (
              <Input
                isRequired
                endContent={
                  <button type="button" onClick={toggleConfirmPasswordVisibility}>
                    {isConfirmPasswordVisible ? (
                      <Icon
                        className="pointer-events-none text-2xl text-default-400"
                        icon="solar:eye-closed-linear"
                      />
                    ) : (
                      <Icon
                        className="pointer-events-none text-2xl text-default-400"
                        icon="solar:eye-bold"
                      />
                    )}
                  </button>
                }
                errorMessage={!isConfirmPasswordValid ? 'Passwords do not match' : undefined}
                label="Confirm Password"
                name="confirmPassword"
                type={isConfirmPasswordVisible ? 'text' : 'password'}
                validationState={isConfirmPasswordValid ? 'valid' : 'invalid'}
                value={confirmPassword}
                onValueChange={value => {
                  setIsConfirmPasswordValid(true)
                  setConfirmPassword(value)
                }}
              />
            )}
            <Button fullWidth color="primary" type="submit">
              {page === 0
                ? 'Continue with Email'
                : page === 1
                  ? 'Enter Password'
                  : 'Confirm Password'}
            </Button>
          </m.form>
        </AnimatePresence>
      </LazyMotion>
      <p className="text-center text-small mt-5">
        Already have an account?&nbsp;
        <Link href="#" size="sm" onPress={() => setAuthFormMode('SignIn')}>
          Log In
        </Link>
      </p>
    </>
  )
}

const SignIn: React.FC<authFormProps> = ({ setAuthFormMode }) => {
  const [isFormVisible, setIsFormVisible] = React.useState(false)
  const [authenticateUser, { isLoading: isAuthenticateUserLoading }] = useAuthenticateUserMutation()
  const [authenticateUserState, setAuthenticateUserState] = useState<LoginCredentialsType>({
    email: '',
    password: '',
  })

  const handleChange = ({ target: { name, value } }: ChangeEvent<HTMLInputElement>) =>
    setAuthenticateUserState(prev => ({
      ...prev,
      [name]: value,
    }))

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const auth = await authenticateUser(authenticateUserState).unwrap()
  }
  const variants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: 10 },
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
      <h1 className="mb-4 text-xl font-medium">Log In</h1>
      <AnimatePresence initial={false} mode="popLayout">
        <LazyMotion features={domAnimation}>
          {isFormVisible ? (
            <m.form
              animate="visible"
              className="flex flex-col gap-y-3"
              exit="hidden"
              initial="hidden"
              variants={variants}
              onSubmit={handleSubmit}
            >
              <Input
                label="Email Address"
                name="email"
                type="email"
                value={authenticateUserState.email}
                variant="bordered"
                onChange={handleChange}
              />
              <Input
                label="Password"
                name="password"
                type="password"
                value={authenticateUserState.password}
                variant="bordered"
                onChange={handleChange}
              />
              <Button color="primary" isLoading={isAuthenticateUserLoading} type="submit">
                Log In
              </Button>
              {orDivider}
              <Button
                fullWidth
                startContent={
                  <Icon className="text-default-500" icon="solar:arrow-left-linear" width={18} />
                }
                variant="flat"
                onPress={() => setIsFormVisible(false)}
              >
                Other Login options
              </Button>
            </m.form>
          ) : (
            <>
              <Button
                fullWidth
                color="primary"
                startContent={
                  <Icon className="pointer-events-none text-2xl" icon="solar:letter-bold" />
                }
                type="button"
                onPress={() => setIsFormVisible(true)}
              >
                Continue with Email
              </Button>
              {orDivider}
              <m.div
                animate="visible"
                className="flex flex-col gap-y-2"
                exit="hidden"
                initial="hidden"
                variants={variants}
              >
                <div className="flex flex-col gap-2">
                  <Button
                    fullWidth
                    startContent={<Icon icon="flat-color-icons:google" width={24} />}
                    variant="flat"
                  >
                    Continue with Google
                  </Button>
                  <Button
                    fullWidth
                    startContent={<Icon className="text-default-500" icon="fe:github" width={24} />}
                    variant="flat"
                  >
                    Continue with Github
                  </Button>
                </div>
                <p className="mt-3 text-center text-small">
                  Need to create an account?&nbsp;
                  <Link href="#" size="sm" onPress={() => setAuthFormMode('SignUp')}>
                    Sign Up
                  </Link>
                </p>
              </m.div>
            </>
          )}
        </LazyMotion>
      </AnimatePresence>
    </>
  )
}
const SearchInput = () => {
  const { isOpen, onOpenChange, onOpen } = useDisclosure()

  return (
    <>
      <Tooltip
        classNames={{
          content: 'px-0',
        }}
        content={
          <Kbd
            className="hidden bg-transparent px-2 py-0.5 shadow-none lg:inline-block"
            // keys={commandKey}
          >
            K
          </Kbd>
        }
        placement="bottom"
      >
        <Button
          aria-label="Quick search"
          className="text-sm font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20"
          endContent={
            <Kbd className="hidden py-0.5 px-2 lg:inline-block" keys={'command'}>
              K
            </Kbd>
          }
          size={'md'}
          startContent={
            <Icon
              className={'text-base text-default-400 pointer-events-none flex-shrink-0'}
              fontSize={18}
              icon="lucide:search"
            />
          }
          variant={'flat'}
          onPress={onOpen}
        >
          Quick Search
        </Button>
      </Tooltip>
      <Modal
        hideCloseButton
        backdrop="blur"
        classNames={{
          base: [
            'mt-[20vh]',
            'border-small',
            'dark:border-default-100',
            'supports-[backdrop-filter]:bg-background/80',
            'dark:supports-[backdrop-filter]:bg-background/30',
            'supports-[backdrop-filter]:backdrop-blur-md',
            'supports-[backdrop-filter]:backdrop-saturate-150',
          ],
          backdrop: ['bg-black/80'],
        }}
        isOpen={isOpen}
        scrollBehavior="inside"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non
                  risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor
                  quam.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non
                  risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor
                  quam.
                </p>
                <p>
                  Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit dolor
                  adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis. Velit duis sit
                  officia eiusmod Lorem aliqua enim laboris do dolor eiusmod. Et mollit incididunt
                  nisi consectetur esse laborum eiusmod pariatur proident Lorem eiusmod et. Culpa
                  deserunt nostrud ad veniam.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export const Navbar = () => {
  const { isOpen, onOpenChange, onOpen } = useDisclosure()

  const [authFormMode, setAuthFormMode] = useState<AuthFormMode>('SignIn')

  return (
    <>
      <NextUINavbar maxWidth={'full'} position="sticky">
        <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
          <NavbarBrand as="li" className="gap-3 max-w-fit">
            <NextLink className="flex justify-start items-center gap-1" href="/">
              <Logo />
              <p className="font-bold text-inherit">ACME</p>
            </NextLink>
          </NavbarBrand>
          <ul className="hidden lg:flex gap-4 justify-start ml-2">
            {siteConfig.navItems.map(item => {
              return (
                <>
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
                </>
              )
            })}
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
          <NavbarItem className="hidden lg:flex">
            <SearchInput />
          </NavbarItem>
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
            <Button onPress={onOpen}>Sign In</Button>
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
          <SearchInput />
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
      <Modal isOpen={isOpen} size={'sm'} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <ModalBody>
                <ResizablePanel>
                  <AnimatePresence initial={false} mode="popLayout">
                    <LazyMotion features={domAnimation}>
                      {authFormMode == 'SignIn' && <SignIn setAuthFormMode={setAuthFormMode} />}
                      {authFormMode == 'SignUp' && <SignUp setAuthFormMode={setAuthFormMode} />}
                    </LazyMotion>
                  </AnimatePresence>
                </ResizablePanel>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
