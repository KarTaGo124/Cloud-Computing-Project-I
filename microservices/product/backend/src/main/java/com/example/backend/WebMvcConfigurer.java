import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Allow CORS on all endpoints
                .allowedOrigins("http://cloud-parcial.s3-website-us-east-1.amazonaws.com") // Your frontend domain
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // HTTP methods
                .allowedHeaders("*") // Allow any headers
                .allowCredentials(true); // Allow cookies or authentication
    }
}
