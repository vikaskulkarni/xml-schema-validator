/**
 * NOTE: This class is auto generated by the swagger code generator program (2.4.10).
 * https://github.com/swagger-api/swagger-codegen
 * Do not edit the class manually.
 */
package com.validate.api;

import java.util.ArrayList;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.validate.model.ErrorResponse;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@Api(value = "XSD")
public interface XSDApi {

	@ApiOperation(value = "", nickname = "xsd", notes = "List of XSD Files", tags = {
			"xsdFile", })
	@ApiResponses(value = { @ApiResponse(code = 200, message = "OK"),
			@ApiResponse(code = 200, message = "Error", response = ErrorResponse.class) })
	@RequestMapping(value = "/xsd", produces = { "application/json" },  method = RequestMethod.GET)
	ResponseEntity<ArrayList<String>> getXsdFiles();
}
