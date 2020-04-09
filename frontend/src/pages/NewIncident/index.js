import React, { useState, useContext, useEffect } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'

import { ThemeContext } from 'styled-components';
import * as Yup from 'yup';

import { toast } from 'react-toastify';

import api from '../../services/api';

import { FiArrowLeft } from 'react-icons/fi'

import Input from '../../Components/Input';
import TextArea from '../../Components/TextArea';
import Button from '../../Components/Button';
import Loading from '../../Components/Loading';

import logo from '../../assets/logo.svg';
import logoDark from '../../assets/logo-dark.svg';

import { Container, Content, Unform } from './styles';

export default function NewIncident() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const { title: themeTitle } = useContext(ThemeContext);
    const [loading, setLoading] = useState(false);

    const history = useHistory();

    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');


    const loadIncident = async () => {
        const { data } = await api.get(`/incidents/${ongId}`);
    };

    async function handleSubmit(e) {
        e.preventDefault();
        const data = {
            title,
            description,
            value
        };

        try {

            setLoading(true);
            const { title, description, value } = data;

            if (ongId) {
                await api.put(`/incidents/${ongId}`, { title, description, value });
                toast.success('Caso atualizado com sucesso');
                history.push('/profile');
                return;
            }


            await api.post('incidents', data, {
                headers: {
                    authorization: ongId
                }
            });

            toast.success('Caso adicionado com sucesso');
            history.push('/profile')

        } catch (err) {
            if (err.response) {
                toast.error(
                    (err.response && err.response.data.error) ||
                    'Erro de comunicação com o servidor'
                );
            }
        } finally {
            setLoading(false);
        }

    }

    useEffect(() => {
        if (ongId) {
            loadIncident();
        }
    }, [id]); //eslint-disable-line


    return (
        <Container>
            <Content>
                <section>
                    <img src={themeTitle === 'light' ? logo : logoDark} alt="Heroes" />
                    <h1>{ongId ? 'Editar caso' : 'Cadastrar novo caso'}</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso</p>

                    <Link id="back" to="/profile">
                        < FiArrowLeft size={16} color="#E02041" />
                        Voltar para home
                    </Link>

                </section>
                <Unform onSubmit={handleSubmit}>
                    <Input
                        id="title" name="title"
                        placeholder="Titulo do caso"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <TextArea
                        id="description"
                        name="description"
                        placeholder="Descrição"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <Input
                        id="value" name="value"
                        placeholder="Valor em reais"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />

                    <Button type="submit">{loading ? <Loading /> : 'Cadastrar'}</Button>

                </Unform>
            </Content>
        </Container>
    )
}

