import React from 'react'
import { useState } from 'react';
import { getSupabase } from "../../utils/supabase";

import { ToggleButtonGroup, ToggleButton, TextField, Button } from "@mui/material";
import styles from './Signup.module.css'

export const Signup = ({ userProfile }) => {
    const [formData, setFormData] = useState(userProfile);

    const onChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async () => {

        const name = formData.name;
        const about = formData.about;
        const role = formData.role;
        let website = '';

        if ('website' in formData) {
            website = formData.website;
        }
        else {
            website = null;
        }
        console.log(name, about, role, website);
        const supabase = getSupabase();
        try {

            const response = await supabase.from('user').update({
                name: name,
                about: about,
                role: role,
                website: website
            }).eq('user_id', userProfile.user_id)

        }
        catch (e) {
            console.error(e.message)
        }
    };

    // role button toggle
    const [alignment, setAlignment] = React.useState('web');
    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
        setFormData({
            ...formData,
            role: newAlignment,
        });
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>

            <ToggleButtonGroup
                color="primary"
                value={alignment}
                exclusive
                onChange={handleChange}
                aria-label="Platform"
            >
                <ToggleButton value="volunteer">Volunteer</ToggleButton>
                <ToggleButton value="org">Organization</ToggleButton>
            </ToggleButtonGroup>


            {formData.role
                ? formData.role == 'org'
                    ? <OrgInputs onChange={onChange} />
                    : <VolunteerInputs onChange={onChange} />
                : null
            }
            {/* <button
                type="submit"
                disabled={!formData.name || !formData.about}
            >
                save
            </button> */}
            <Button type="submit" disabled={!formData.name || !formData.about} variant="contained">Save</Button>
        </form>
    )
}

const OrgInputs = ({ onChange }) => {
    return (
        <>
            <TextField label="Organization Name" variant="outlined" id='name' name='name' onChange={onChange} required />
            <TextField label="Tell us about your Organization!" variant="outlined" id='about' name='about' onChange={onChange} required multiline fullWidth rows={2} />
            <TextField label="Website URL" variant="outlined" id='website' name='website' onChange={onChange} />
        </>
    )
}

const VolunteerInputs = ({ onChange }) => {
    return (
        <>
            <TextField label="Name" variant="outlined" id='name' name='name' onChange={onChange} required />
            <TextField label="Tell us about you!" variant="outlined" id='about' name='about' onChange={onChange} required multiline fullWidth rows={2} />
        </>
    )
}