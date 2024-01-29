// ** React Imports
import { Fragment } from 'react'

// ** Dropdowns Imports
import IntlDropdown from './IntlDropdown'
import CartDropdown from './CartDropdown'
import UserDropdown from './UserDropdown'
import CustomNavbarSearch from './CustomNavbarSearch'
// import NavbarSearch from './NavbarSearch'
import NotificationDropdown from './NotificationDropdown'
import { Link } from 'react-router-dom'

// ** Custom Components
import NavbarBookmarks from './NavbarBookmarks'

// ** Third Party Components
import { Sun, Moon, Menu, Mail } from 'react-feather'
import { NavItem, NavLink, UncontrolledTooltip } from 'reactstrap'

const ThemeNavbar = props => {
  // ** Props
  const { skin, setSkin, setMenuVisibility } = props

  // ** Function to toggle Theme (Light/Dark)
  const ThemeToggler = () => {
    if (skin === 'dark') {
      return <Sun className='ficon' onClick={() => setSkin('light')} />
    } else {
      return <Moon className='ficon' onClick={() => setSkin('dark')} />
    }
  }

  return (
    <Fragment>
      <ul className='nav navbar-nav align-items-center'>
        <NavItem className='mobile-menu mr-auto d-xl-none'>
          <NavLink className='nav-menu-main menu-toggle hidden-xs is-active' onClick={() => setMenuVisibility(true)}>
            <Menu className='ficon' />
          </NavLink>
        </NavItem>
        <UserDropdown />
        <NavItem className='d-block'>
          <NavLink tag={Link} to={'/apps/email'} id={'email'}>
            <Mail className='ficon' />
            <UncontrolledTooltip target={'email'}>{'Email'}</UncontrolledTooltip>
          </NavLink>
        </NavItem>
      </ul>
      <div className='bookmark-wrapper d-flex align-items-center ml-auto'>
        <ul className='nav navbar-nav align-items-center'>
          <IntlDropdown />
          <CustomNavbarSearch />
          <NotificationDropdown />
          <NavItem className='d-none d-lg-block'>
            <NavLink className='nav-link-style'>
              <ThemeToggler />
            </NavLink>
          </NavItem>
        </ul>
        <NavbarBookmarks setMenuVisibility={setMenuVisibility} />
      </div>
    </Fragment>
  )
}

export default ThemeNavbar
