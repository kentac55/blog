import React, { FC, useMemo } from 'react'
import { useTheme, Spacer, Link, Divider } from '@zeit-ui/react'
import useblogConfig from '../config-context'
import SunIcon from '@zeit-ui/react-icons/sun'
import MoonIcon from '@zeit-ui/react-icons/moon'
import { blogConfig } from '../config'

type ContactsProps = {
  isDetailPage: boolean
}

const Contacts: FC<ContactsProps> = ({ isDetailPage = false }) => {
  const theme = useTheme()
  const blogThemeConfig = useblogConfig()
  const isDark = useMemo(() => theme.type === 'dark', [theme.type])
  const switchTheme = (): void =>
    blogThemeConfig.onChange(theme.type === 'dark')

  const themeTitle = 'Switch themes'
  const linkProps = {
    rel: 'noreferrer',
    target: '_blank',
  }

  return (
    <>
      <div className="contacts">
        {isDetailPage && <Divider y={0.5} />}
        <div className="between">
          <div className="socials">
            {blogConfig.email && (
              <Link aria-label="email" href={blogConfig.email} {...linkProps}>
                Email
              </Link>
            )}
            {blogConfig.github && (
              <Link aria-label="github" href={blogConfig.github} {...linkProps}>
                Github
              </Link>
            )}
            {blogConfig.twitter && (
              <Link
                aria-label="twitter"
                href={blogConfig.twitter}
                {...linkProps}
              >
                Twitter
              </Link>
            )}
          </div>
          <div>
            {isDark && (
              <span title={themeTitle}>
                <div onClick={switchTheme}>
                  <SunIcon size={16} />
                </div>
              </span>
            )}
            {!isDark && (
              <span title={themeTitle}>
                <div onClick={switchTheme}>
                  <MoonIcon size={16} />
                </div>
              </span>
            )}
          </div>
        </div>

        <style jsx>{`
          .contacts {
            width: ${blogConfig.layouts.pageWidth};
            padding: 0 ${theme.layout.gapQuarter};
            position: absolute;
            z-index: 1;
            bottom: 3.5rem;
            left: 50%;
            transform: translateX(-50%);
            color: ${theme.palette.accents_6};
          }

          .between {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .contacts :global(svg) {
            cursor: pointer;
            margin: ${theme.layout.gapQuarter} ${theme.layout.gapHalf};
            position: relative;
            color: inherit;
            z-index: 2;
          }

          .contacts :global(a) {
            color: inherit;
          }

          .socials :global(a) {
            margin-right: 0.5rem;
            font-size: 0.75rem;
            text-transform: uppercase;
          }

          .contacts span {
            color: inherit;
            display: inline-flex;
            justify-content: center;
            align-items: center;
          }

          .contacts span:hover {
            color: ${theme.palette.accents_4};
          }

          .contacts :global(a:hover) {
            color: ${theme.palette.accents_4};
            text-decoration: underline dashed;
            cursor: ne-resize;
            transition: all 150ms ease;
          }

          @media only screen and (max-width: ${theme.layout.breakpointMobile}) {
            .contacts {
              position: absolute;
              width: ${blogConfig.layouts.pageWidthMobile};
            }
          }
        `}</style>
      </div>
      <Spacer y={3.5} />
    </>
  )
}

export default Contacts
