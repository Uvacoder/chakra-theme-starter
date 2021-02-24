import * as React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  Button,
  theme as baseTheme,
  extendTheme,
  Theme,
} from '@chakra-ui/react';
import { Global } from '@emotion/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';

const changeTeal: Theme = extendTheme({
  colors: {
    teal: {
      500: '#000fff',
    },
  },
});

const themeOne: Theme = extendTheme({
  colors: {
    primary: {
      50: '#f8fae1',
      100: '#e9efbe',
      200: '#dbe399',
      300: '#ccd773',
      400: '#becc4d',
      500: '#a4b333',
      600: '#808b26',
      700: '#5b6319',
      800: '#363b0b',
      900: '#1a202c',
    },
  },
  fonts: {
    heading: 'var(--font-heading)',
    body: 'var(--font-paragraph)',
  },
});

const themeTwo: Theme = extendTheme({
  colors: {
    primary: {
      50: '#e3e6ff',
      100: '#b2b7ff',
      200: '#7f87ff',
      300: '#4c57ff',
      400: '#1a27ff',
      500: '#000de6',
      600: '#0009b4',
      700: '#000682',
      800: '#000350',
      900: '#000021',
    },
  },
  fonts: {
    heading: 'Raleway',
    body: 'Open Sans',
  },
});

const Fonts = () => (
  <Global
    styles={`
      /* Copied from https://fonts.googleapis.com/css2?family=Open+Sans:wght@700&family=Raleway&display=swap */
      /* latin-ext */
      @font-face {
        font-family: 'Open Sans';
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: url(https://fonts.gstatic.com/s/opensans/v18/mem5YaGs126MiZpBA-UN7rgOXOhpKKSTj5PW.woff2) format('woff2');
        unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
      }
      /* latin */
      @font-face {
        font-family: 'Open Sans';
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: url(https://fonts.gstatic.com/s/opensans/v18/mem5YaGs126MiZpBA-UN7rgOUuhpKKSTjw.woff2) format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      /* latin-ext */
      @font-face {
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url(https://fonts.gstatic.com/s/raleway/v18/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVvaorCGPrcVIT9d0c-dYA.woff) format('woff');
        unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
      }
      /* latin */
      @font-face {
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url(https://fonts.gstatic.com/s/raleway/v18/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVvaorCIPrcVIT9d0c8.woff) format('woff');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      `}
  />
);

// Context provider
const ThemeStateContext = React.createContext<Theme | undefined>(undefined);
const ThemeDispatchContext = React.createContext<
  React.Dispatch<React.SetStateAction<Theme>> | undefined
>(undefined);

const ThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = React.useState<Theme>(baseTheme);
  return (
    <ThemeStateContext.Provider value={theme}>
      <ThemeDispatchContext.Provider value={setTheme}>
        {children}
      </ThemeDispatchContext.Provider>
    </ThemeStateContext.Provider>
  );
};

function useTheme() {
  const theme = React.useContext(ThemeStateContext);
  const setTheme = React.useContext(ThemeDispatchContext);

  if (!theme || !setTheme) {
    throw new Error('Requires ThemeProvider');
  }

  return [theme, setTheme];
}

const MainApp = () => {
  const [theme, setTheme] = useTheme();

  const selectTheme = (theme: Theme) => {
    if (!setTheme) {
      return null;
    }

    // @ts-expect-error
    setTheme(theme);
  };

  console.log(theme);
  const contentEditable = true;
  return (
    <ChakraProvider theme={theme}>
      <Box p="4" background="teal.500"></Box>
      <ChakraProvider theme={changeTeal}>
        <Box p="4" background="teal.500"></Box>
      </ChakraProvider>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <Box>
            <Button
              contentEditable={contentEditable}
              as={contentEditable ? 'span' : 'button'}
              colorScheme="teal"
              onClick={() => selectTheme(themeOne)}
            >
              Theme One
            </Button>
            <Button
              contentEditable={true}
              colorScheme="primary"
              onClick={() => selectTheme(themeTwo)}
            >
              Theme Two
            </Button>
          </Box>
          <VStack spacing={8}>
            <Logo h="40vmin" pointerEvents="none" />
            <Text contentEditable={true}>
              Edit <Code fontSize="xl">src/App.tsx</Code> and save to reload.
            </Text>
            <Link
              color="teal.500"
              href="https://chakra-ui.com"
              fontSize="2xl"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn Chakra
            </Link>
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
};

export const App = () => (
  <ThemeProvider>
    <Fonts />
    <MainApp />
  </ThemeProvider>
);
