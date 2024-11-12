import React from 'react'
import Overview from './components/overview';
import Researchandpub from './components/researchandpub';
import Consulting from './components/consulting';
import Training from './components/training';
import Certification from './components/certification';
import Workshop from './components/workshop';
import EducationConsultancy from './components/educationconsul';
import MergersAndAcquisitions from './components/mergerandacq';

type Props = {}

const ServicePage = (props: Props) => {
    return (
        <div className='font-Josefin'>
         <Overview />
         <br />
          <Researchandpub />
          <br />
          <Consulting />
          <br />
          <Training />
          <br />
          <EducationConsultancy />
          <br />
          <Certification />
          <br />
          <MergersAndAcquisitions />
          <br />
          <Workshop />
        </div>
      );
}

export default ServicePage