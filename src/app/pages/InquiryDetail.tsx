import { useParams } from 'react-router';
import { InquiryDetailsPage } from '../../components/InquiryDetails/InquiryDetailsPage';

export default function InquiryDetail() {
  const { id } = useParams();
  return <InquiryDetailsPage id={id} />;
}
