"use client"

import { useForm } from 'react-hook-form';
import { 
    Form 
} from '@/components/ui/form';
import { zodResolver } from "@hookform/resolvers/zod";
import { UserValidation } from '@/lib/validations/user';

interface Props {
    user:{
        id: string;
        objectId: string;
        username: string;
        bio: string;
        image: string;
    };
    btnTitle: string;
}

const AccountProfile = ( { user, btnTitle}: Props ) => {
    const from = useForm({
        resolver: zodResolver(UserValidation)
    })
    return (
        <Form>

        </Form>
    )
}

export default AccountProfile;