import React from "react";

export default function Contact(){
    return(
        <div>
            <div className="map">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13274.837857384235!2d104.87147572721516!3d11.564707895998772!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109519fe4077d69%3A0x20138e822e434660!2sRUPP%20(Royal%20University%20of%20Phnom%20Penh)!5e0!3m2!1sen!2skh!4v1673066052086!5m2!1sen!2skh" height={500} style={{border: 0}} allowFullScreen aria-hidden="false" tabIndex={0} />
            </div>
            <section className="contact spad">
                <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-6">
                    <div className="contact__text">
                        <div className="section-title">
                        <span>Information</span>
                        <h2>Contact Us</h2>
                        <p>As you might expect of a company that began as a high-end interiors contractor, we pay
                            strict attention.</p>
                        </div>
                        <ul>
                        <li>
                            <h4>America</h4>
                            <p>195 E Parker Square Dr, Parker, CO 801 <br />+43 982-314-0958</p>
                        </li>
                        <li>
                            <h4>France</h4>
                            <p>109 Avenue Léon, 63 Clermont-Ferrand <br />+12 345-423-9893</p>
                        </li>
                        </ul>
                    </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                    <div className="contact__form">
                        <form action="#">
                        <div className="row">
                            <div className="col-lg-6">
                            <input type="text" placeholder="Name" />
                            </div>
                            <div className="col-lg-6">
                            <input type="text" placeholder="Email" />
                            </div>
                            <div className="col-lg-12">
                            <textarea placeholder="Message" defaultValue={""} />
                            <button type="submit" className="site-btn">Send Message</button>
                            </div>
                        </div>
                        </form>
                    </div>
                    </div>
                </div>
                </div>
            </section>
        </div>
    )
}