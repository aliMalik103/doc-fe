import { headers } from '../constant';
import ApiService from '.';
import { ApiResponse } from './models/api-response.model';

class DocumentApi {
    addDocumentApi = async (data: FormData): Promise<ApiResponse> => {
      return ApiService.post(`document-parser/ocr`, data, {
        headers: {
          'Content-Type': 'multipart/form-data', // Ensure the correct content type
        },
      })
        .then((result) => ({
          error: false,
          data: result.data,
        }))
        .catch((err) => {
          console.log('Upload Error:', err);
          return { error: true, data: err };
        });
    };
  }
  
  export const documentRequests = new DocumentApi();

