import React from 'react'
import { useState } from 'react';
import { getSupabase } from "../../utils/supabase";

const Signup = ({ user }) => {
    const [formData, setFormData] = useState(user);

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

        const supabase = getSupabase();
        try {

            const response = await supabase.from('user').update({
                name: name,
                about: about,
                role: role,
                website: website
            }).eq('user_id', user.user_id)

            console.log(response)
        }
        catch (e) {
            console.error(e.message)
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="radio" id="volunteer" name="role" value="volunteer" onChange={onChange} />
            <label htmlFor="volunteer">VOLUNTEER</label>
            <input type="radio" id="org" name="role" value="org" onChange={onChange} />
            <label htmlFor="org">ORG</label>
            <br />
            {formData.role
                ? formData.role == 'org'
                    ? <OrgInputs onChange={onChange} />
                    : <VolunteerInputs onChange={onChange} />
                : null
            }
            <button
                type="submit"
                disabled={!formData.name || !formData.about}
            >
                save
            </button>
        </form>
    )
}

export default Signup

const OrgInputs = ({ onChange }) => {
    return (
        <>
            <label htmlFor="name">Organization Name</label>
            <input id='name' type="text" name='name' onChange={onChange} />

            <label htmlFor="about">Tell us about your organization!</label>
            <textarea id='about' name='about' onChange={onChange} />

            <label htmlFor="website">Website URL</label>
            <input type='url' id='website' name='website' onChange={onChange} />
        </>
    )
}

const VolunteerInputs = ({ onChange }) => {
    return (
        <>
            <label htmlFor="name">Name</label>
            <input id='name' type="text" name='name' onChange={onChange} />

            <label htmlFor="about">Tell us about you!</label>
            <textarea id='about' name='about' onChange={onChange} />

        </>
    )
}