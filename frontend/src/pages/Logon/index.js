import React, { useState, useContext } from 'react';
import { FiLogIn } from 'react-icons/fi'

import api from '../../services/api'
import { Link, useHistory } from 'react-router-dom'
import logo from '../../assets/logo.svg'
import logoDark from '../../assets/logo-dark.svg';
import heroesImg from '../../assets/heroes.png'

import * as Yup from 'yup';

import Input from '../../Components/Input';
import Button from '../../Components/Button';

import { ThemeContext } from 'styled-components';

import { Container, Unform } from './styles';

export default function Logon() {
    const [id, setId] = useState('');
    const history = useHistory();
    const { title } = useContext(ThemeContext);

    async function handleLogin(e) {
        //e.preventDefault();
        try {
            const response = await api.post('sessions', { id })

            localStorage.setItem('ongId', id)
            localStorage.setItem('ongName', response.data.name)

            history.push('/profile')
        } catch (error) {
            alert("Falha ao logar, tente novamente")
        }

    }

    return (
        <Container>
            <section className="form">
                <img src={title === 'light' ? logo : logoDark} alt="Heroes" />

                <Unform onSubmit={handleLogin} action="">
                    <h1>Faça seu login</h1>
                    <Input
                        name="id"
                        id="id"
                        placeholder="Sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <Button className="button" type="submit">Entrar</Button>

                    <Link id="register" to="/register">
                        <FiLogIn size={16} color="#E02041" />
                        Não tenho cadastro
                        </Link>
                </Unform>
            </section>

            <img src={heroesImg} alt="Heroes" />
        </Container>
    );

}