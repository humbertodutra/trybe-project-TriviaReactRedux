import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../../App.css';
import { useDispatch } from 'react-redux';
import { tokenData, playerData } from '../../redux/actions';
import { fetchToken } from '../../services/api';

export default function Login() {
  const [state, setState] = React.useState({
    name: '',
    email: '',
  });

  const dispatch = useDispatch();
  const history = useHistory();

  function handleChange({ target }) {
    const { name, value } = target;
    setState({
      ...state,
      [name]: value,
    });
  }

  async function handlePlay() {
    const { token } = await fetchToken();
    dispatch(tokenData(token));
    dispatch(playerData(state));
    history.push('/game');
  }

  return (
    <div>
      <form onSubmit={ (event) => event.preventDefault() }>
        <label htmlFor="input-name">
          <input
            name="name"
            id="input-name"
            type="text"
            data-testid="input-player-name"
            value={ state.name }
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="input-email">
          <input
            name="email"
            id="input-email"
            type="email"
            data-testid="input-gravatar-email"
            value={ state.email }
            onChange={ handleChange }
          />
        </label>
        <button
          id="btn-play"
          type="submit"
          data-testid="btn-play"
          disabled={ state.name === '' || state.email === '' }
          onClick={ handlePlay }
        >
          Play
        </button>
      </form>

      <Link to="/settings">
        <button
          data-testid="btn-settings"
          type="button"
        >
          Configurações do jogo
        </button>
      </Link>
    </div>
  );
}
