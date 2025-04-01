import { createSystem, defineConfig } from "@chakra-ui/react"

const config = defineConfig({
  theme: {
    tokens: {
          colors: {
            brand: {
    50: '#f9f8f6',  // Fundo muito claro
    100: '#f1e7c7',  // Amarelo claro suave
    200: '#f0db8f',  // Amarelo mais forte
    300: '#f0c058',  // Amarelo dourado
    400: '#d59e3e',  // Amarelo escuro
    500: '#b78a1f',  // Amarelo queimado
    600: '#8a6e15',  // Amarelo terroso
    700: '#5c4c0b',  // Amarelo intenso
    800: '#3e3307',  // Amarelo escuro
    900: '#261f03',  // Amarelo quase marrom
  },
  blue: {
    50: '#e6f0f8',  // Azul bem claro
    100: '#b4d6f1',  // Azul suave
    200: '#80b9e3',  // Azul mais forte
    300: '#5a98c2',  // Azul calmo
    400: '#3e7ba1',  // Azul padrão
    500: '#2a5c7f',  // Azul escuro
    600: '#1d4965',  // Azul profundo
    700: '#13384c',  // Azul muito escuro
    800: '#0b2c38',  // Azul quase preto
    900: '#081f26',  // Azul intenso
  }
      },
    },
  },
})
const system = createSystem(config)
export default system