import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button, Typography, Box, Container, Grid } from '@shadcn/ui';

//Splash screen
export default function Homepage() {
 const router = useRouter();

 const handleLearnMore = () => {
    // Redirect to a detailed features page
    router.push('/sign-in'); // Login for now
 };

 return (
    <>
             <Button>Button</Button>


      </>
 );
}
