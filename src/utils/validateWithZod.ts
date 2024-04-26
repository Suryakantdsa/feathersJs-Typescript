import { ZodSchema } from 'zod';

// Define a generic function that accepts a Zod schema and data of any type.
export function validateWithZod<T>(Schema: ZodSchema<T>, data: any) {
    // Perform Zod validation
    const validationRes = Schema.safeParse(data);

    if (!validationRes.success) {
        // Initialize acc with an index signature to allow string keys and values of type string
        const acc: { [key: string]: string } = {};
        console.log(validationRes.error.issues)
        // Collect field errors
        validationRes.error.issues.forEach(issue => {
            // Use the field path as key and the message as value
            const path = issue.path.join('.');
            acc[path] = issue.message;
        });

        return { success: false, errors: acc };
    }

    // Return the parsed data if validation is successful
    return { success: true, data: validationRes.data };
}