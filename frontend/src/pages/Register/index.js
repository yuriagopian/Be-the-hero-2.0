import React, { useState, useContext, select} from 'react'
import { Link, useHistory } from 'react-router-dom'

import api from '../../services/api';

import logo from '../../assets/logo.svg';
import logoDark from '../../assets/logo-dark.svg';

import { Container, Content, Unform } from './styles';
import { FiArrowLeft } from 'react-icons/fi'

import { ThemeContext } from 'styled-components';
import * as Yup from 'yup';

import Loading from '../../Components/Loading';
import Input from '../../Components/Input';
import Button from '../../Components/Button';


export default function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [city, setCity] = useState('')
    const [uf, setUf] = useState('')

    const history = useHistory();
    const { title } = useContext(ThemeContext);

    async function handleRegister(e) {
        e.preventDefault();

        const data = {
            name,
            email,
            whatsapp,
            city,
            uf,
        };
        try {
            
            const response = await api.post('ongs',data);
            alert(`Seu ID de acesso : ${response.data.id}`)

            history.push('/')

        } catch (error) {
            alert('Erro no cadastro, tente novament !')
        };
    }

    async function handleUf () {
        try {
            const data = []
            const response = await api.get('ufs', data);
        } catch (error) {
            
        }
        
    }


    return (
        <Container>
            <Content>
                <section>
                    <img src={title === 'light' ? logo : logoDark} alt="Heroes" />

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

                    <Link id="back" to="/">
                        < FiArrowLeft size={16} color="#E02041" />
                        Voltar para logon
                    </Link>

                </section>
                <Unform onSubmit={handleRegister} >
                    <Input
                        id="ngo" name="name"
                        placeholder="Nome da ONG"
                        value={name}
                        onChange={e => setName(e.target.value)} />
                    <Input
                        id="email" name="email"
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)} />
                    <Input
                        id="whatsapp" name="whatsapp"
                        placeholder="WhatsApp"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                    />

                    <div className="input-group">
                        <Input
                            id="city" name="city"
                            placeholder="Cidade"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        />
                        <Input
                            id="uf" name="uf"
                            placeholder="UF"
                            style={{ width: 80 }}
                            value={uf}
                            onChange={e => setUf(e.target.value)}
                        />
                    </div>
                    <Button className="button" type="submit">
                        Cadastrar
                    </Button>
                    </Unform>
            </Content>
        </Container>
    );
}