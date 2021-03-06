// TODO-3 move copy to content directory
const capitalize = require('lodash.capitalize')
const merge = require('lodash.merge')
const snakeCase = require('lodash.snakecase')
const { nav, div, a, ul } = require('../../helpers/tags')
const menuItem = require('./menu_item.tmpl')
const icon = require('./icon.tmpl')

// TODO-2 add unread count to notices icon

// A list of all menu items and their configurations
const items = {
  home: { url: '/' },
  my_subjects: { title: 'My Subjects', icon: 'subject' },
  log_in: { title: 'Log In', icon: 'log-in' },
  terms: {},
  contact: {},
  notices: {}, // TODO-2 poll and show unread count
  settings: {},
  log_out: { url: '#log_out', title: 'Log Out', icon: 'log-out' },
  search: {},
  discuss_card: {
    url: '/search?kind=topic&q={id}',
    title: 'Discuss Card',
    icon: 'post',
  },
  discuss_unit: {
    url: '/search?kind=topic&q={id}',
    title: 'Discuss Unit',
    icon: 'post',
  },
  discuss_subject: {
    url: '/search?kind=topic&q={id}',
    title: 'Discuss Subjects',
    icon: 'post',
  },
  create: {},
}

// For items that don't have them
// Use the name to populate title and url automatically
// And set the default icon to be painfully obviously wrong
Object.keys(items).forEach(name => {
  items[name] = merge(
    {
      name,
      title: capitalize(name),
      url: `/${snakeCase(name)}`,
      icon: name,
    },
    items[name] || {}
  )
})

// For each state, a list of the menu items to appear
const menus = {
  loggedOut: ['home', 'log_in', 'search', 'contact', 'terms'],
  loggedIn: [
    'my_subjects',
    'search',
    'notices',
    'create',
    'settings',
    'contact',
    'terms',
    'log_out',
  ],
}

const addContextItems = (menuItems, { card, unit, subject }) => {
  menuItems = menuItems.slice()

  if (card) {
    const discuss = merge({}, items.discuss_card)
    discuss.url = discuss.url.replace('{id}', card)
    menuItems.push(discuss)
    return menuItems
  }

  if (unit) {
    const discuss = merge({}, items.discuss_unit)
    discuss.url = discuss.url.replace('{id}', unit)
    menuItems.push(discuss)
    return menuItems
  }

  if (subject) {
    const discuss = merge({}, items.discuss_subject)
    discuss.url = discuss.url.replace('{id}', subject)
    menuItems.push(discuss)
    return menuItems
  }

  return menuItems
}

module.exports = data => {
  let menuItems = menus[data.kind].map(name => items[name])
  menuItems = addContextItems(menuItems, data.context)
  return nav({ className: data.open ? 'menu selected' : 'menu' }, [
    data.open ? div({ className: 'menu__overlay' }) : null,
    a(
      {
        href: '#',
        className: 'menu__trigger',
      },
      div({ className: 'menu__logo' }),
      icon('menu'),
      div({ className: 'menu__label' }, 'Menu')
    ),
    data.open
      ? ul({ className: 'menu__items' }, menuItems.map(d => menuItem(d)))
      : null,
  ])
}
