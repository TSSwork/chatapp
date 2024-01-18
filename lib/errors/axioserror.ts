const AxiosError = ( error:any ) => {

    if (error){

    const response = error.response;
        
        if (response) {
            // Handle the error response
            
            const responseData = response.data;
            const responseStatus = response.status;

            const errorMessage = `${responseData} (${responseStatus})`;
            return errorMessage as string;
            
        } else {
            console.error(`Axios error with no response: ${error.message}`);
        }
    }
    return null;

}

export default AxiosError;