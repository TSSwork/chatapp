
const PrismaError = ( error:any ) => {

    if (error){

        let ErrorMessage:string = "INTERNAL ERROR" ;
        let ErrorStatus :number = 500 ;

        if (
            error.code === 'P2002' &&
            error.meta?.target.includes('User_email_key')
        ) {
            // Email is already in use, return a user-friendly error message
            ErrorMessage = 'Email is already in use';
            ErrorStatus = 400;

        }

        return { ErrorMessage, ErrorStatus}
    }
    return null;

}

export default PrismaError;