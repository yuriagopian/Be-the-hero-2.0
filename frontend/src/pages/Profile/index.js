import React, { useEffect, useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FiPower, FiTrash2 } from 'react-icons/fi'

import Toggle from 'react-toggle';
import { ThemeContext } from 'styled-components';

import { confirmAlert } from 'react-confirm-alert';
import { toast } from 'react-toastify';
import { FaMoon, FaSun, FaSadCry } from 'react-icons/fa';

import api from '../../services/api';

import Button from '../../Components/Button';
import IncidentCard from '../../Components/IncidentCard';
import logo from '../../assets/logo.svg';
import logoDark from '../../assets/logo-dark.svg';
import Context from '../../styles/themes/context';


import { Container, Header, IncidentsList, Empty } from './styles';

export default function Profile() {
    const { colors, title } = useContext(ThemeContext);
    const { toggleTheme } = useContext(Context);
    const [incidents, setIncidents] = useState([]);
    const history = useHistory()

    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');

    useEffect(() => {
        api.get('/profile', {
            headers: {
                authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongId]);


    async function handleDeleteIncident(id) {
        confirmAlert({
            title: 'Confirme a exclusão',
            message: `Deseja remover o caso ${id} ?`,
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        try {
                            await api.delete(`incidents/${id}`, {
                                headers: {
                                    authorization: ongId,
                                }
                            });
                            toast.success('Caso removido com sucesso');
                            setIncidents(incidents.filter(incident => incident.id !== id))

                        } catch (err) {
                            toast.error(
                                (err.response && err.response.data.error) ||
                                'Erro de comunicação com o servidor'
                            );
                        }
                    },
                },
                {
                    label: 'No',
                    onClick: () => '',
                },
            ],
        });
    };


    function handleLogout() {
        localStorage.clear()
        history.push('/')
    }

    return (
        <Container>
            <Header>
                <img src={title === 'light' ? logo : logoDark} alt="Heroes" />

                <span>Bem vindo, {ongName}</span>
                <Toggle
                    checked={title === 'dark'}
                    onChange={toggleTheme}
                    className="toggle"
                    icons={{
                        checked: <FaMoon color="yellow" size={12} />,
                        unchecked: <FaSun color="yellow" size={12} />,
                    }}
                />

                <Button
                    id="newIncident"
                    type="button"
                    onClick={() => history.push('/incidents/new')}
                >
                    Cadastrar novo caso
                </Button>


                <button id="logout" onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </Header>
            <h1 id="incidentsListTitle">Casos cadastrados</h1>
            {incidents.length > 0 ? (
                <IncidentsList>
                    {incidents.map(incident => (
                        <IncidentCard
                            key={incident.id}
                            incident={incident}
                            handleDelete={handleDeleteIncident}
                        />
                    ))}
                </IncidentsList>
            ) : (
                    <Empty>
                        <h1>Você ainda não cadastrou nenhum caso.</h1>
                        <FaSadCry color={colors.text} size={50} />
                    </Empty>
                )}
        </Container>

    );
}