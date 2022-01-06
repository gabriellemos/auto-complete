import styled from 'styled-components'

export const Container = styled.div`
  width: 400px;
  color: var(--input-text);
  position: relative;

  input {
    width: 100%;
    box-sizing: border-box;
    padding-right: ${({ isLoading }) => (isLoading ? '38px' : '2px')};
  }

  .loading {
    position: absolute;
    top: 0;
    right: 0;
    padding: 8px;
  }

  .suggestion {
    position: absolute;
    width: 400px;
    max-height: 300px;
    overflow-y: auto;

    margin: 0;
    padding: 0;
    border: 1px solid var(--input-text);
    background: var(--input-background);
  }

  .suggestion__item {
    a {
      color: var(--input-text);
      text-decoration: none;
      display: block;

      padding: 0.8rem 1rem;
    }

    &:hover {
      background: var(--input-hover);
    }

    &:active {
      background: var(--input-active);
    }
  }
`
