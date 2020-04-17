import React, { useRef, useEffect } from 'react';
import { useField } from '@unform/core';

import { Container, Select } from './styles';

export default function SelectList({ ...props }) {
    return <Container id="uf" ><Select {...props} /> </Container> ;
  }
  
