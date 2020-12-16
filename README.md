# [ShaggyTech.com/vin-decoder](https://www.shaggytech.com/vin-decoder)

> A Nuxt Proggressive Web App (PWA) to decode Vehicle Identification Numbers (VINs) using the National Highway Traffic Safety Administration API. Implemented using the Vue Composition API and TypeScript.

[![codecov](https://codecov.io/gh/ShaggyTech/vin-decoder/branch/master/graph/badge.svg?token=sDqrGrhYQ6)](https://codecov.io/gh/ShaggyTech/vin-decoder)

## Build Setup

``` bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

## Testing

``` bash
# Run all tests
$ yarn test

# Watch for changes and continuously run tests
$ yarn test:watch
```

## Note on adding new components

Components are auto imported via nuxt magic. In order to add a new component you
must do two things:

Assuming a component named `InputWithValidation` located in `./components/base/`, with a filename of `InputWithValidation.vue`.  Instead of naming the component `BaseInputWithValidation` we can drop the `Base` from the name and also allow nuxt to auto import our component.  This allows for a cleaner components folder structure. For example, you could have many different same-named `Card.vue` components each within their own parent folders, rather than naming differing card components like `LoginCard`, `RegisterCard`, `VinDecoderCard`, etc.

This also means you can use the component in `<template>` tags directly without first importing them.  You would use the `InputWithValidation` just like any other custom component, ex: `<BaseInputWithValidation />`

### 1. (only required if adding a new components directory)

Add the new component directory to the `components.dirs` array located in `./components/index.ts`.  You will need to add an object with `path` and `prefix` keys as shown below.

``` javascript
const components = [
  dirs: [
    '~/components',
    {
      path: '~/components/app/',
      prefix: 'App'
    },
    // Adding our new component directory here:
    {
      path: '~/components/base/'
      prefix: 'Base'
    }
  ]
]
```

### 2. (required for all new components you would like to run tests against)

Assuming the same `InputWithValidation` component given above:

Open the jest setup file located in `./test/config/jest.setup.js`

Add the new component to the `components` array const like so:

``` javascript
const components = [
  {
    name: 'AppTitleCard',
    path: '../../components/app/TitleCard.vue',
  },
  {
    name: 'BaseInput',
    path: '../../components/base/Input.vue',
  },
  // Adding our new component here
  {
    name: 'BaseInputWithValidation',
    path: '../../components/base/InputWithValidation.vue',
  },
```

### 3. Use the component directly in your templates, no need to import via script tag

``` html
<template>
  <BaseInputWithValidation />
</template>
```

You can even make them lazily load by prefixing `Lazy` to the name:

``` html
<template>
  <LazyBaseInputWithValidation />
</template>
```
